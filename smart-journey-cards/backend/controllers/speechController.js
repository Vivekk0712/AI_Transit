const openai = require('openai');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config();

const openai_api = new openai({ apiKey: process.env.OPENAI_API_KEY });

exports.transcribeAudio = async (req, res) => {
  let audioFilePath = null;
  let convertedAudioPath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No audio file uploaded' });
    }

    audioFilePath = req.file.path;
    const outputFileName = `${req.file.filename}.mp3`;
    convertedAudioPath = path.join(path.dirname(audioFilePath), outputFileName);

    // Convert webm to mp3 using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(audioFilePath)
        .toFormat('mp3')
        .on('error', (err) => {
          console.error('FFmpeg conversion error:', err);
          reject(err);
        })
        .on('end', () => {
          console.log('Audio conversion complete.');
          resolve();
        })
        .save(convertedAudioPath);
    });

    const transcription = await openai_api.audio.transcriptions.create({
      file: fs.createReadStream(convertedAudioPath),
      model: 'whisper-1',
      language: 'en',
    });

    res.json({ text: transcription.text });
  } catch (error) {
    console.error('Error transcribing audio with OpenAI Whisper:', error);
    res.status(500).json({ message: 'Error transcribing audio' });
  } finally {
    // Clean up files
    if (audioFilePath && fs.existsSync(audioFilePath)) {
      fs.unlinkSync(audioFilePath);
    }
    if (convertedAudioPath && fs.existsSync(convertedAudioPath)) {
      fs.unlinkSync(convertedAudioPath);
    }
  }
};

