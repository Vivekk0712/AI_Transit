
const History = require('../models/History');

exports.saveHistory = async (req, res) => {
  const { text, parsedQuery, selectedOption } = req.body;
  const userId = req.user.id;

  console.log('Save history request:', { userId, text, parsedQuery, selectedOption });

  try {
    const history = new History({
      userId,
      text,
      parsedQuery,
      selectedOption,
    });

    const savedHistory = await history.save();
    console.log('History saved successfully:', savedHistory);

    res.status(201).json({ message: 'History saved successfully' });
  } catch (err) {
    console.error('Error saving history:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getHistory = async (req, res) => {
  const { userId } = req.params;

  try {
    const history = await History.find({ userId }).sort({ timestamp: -1 });
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
