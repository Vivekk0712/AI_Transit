
const openai = require('openai');
const axios = require('axios');
require('dotenv').config();

const openai_api = new openai({ apiKey: process.env.OPENAI_API_KEY });

// Function to calculate distance between two coordinates (Haversine formula)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

exports.query = async (req, res) => {
  const { query } = req.body;

  try {
    const response = await openai_api.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that parses travel queries. Extract the source, destination, and intent (cheapest, fastest, or most comfortable) from the user query. Respond with a JSON object.',
        },
        { role: 'user', content: query },
      ],
    });

    const parsedQuery = JSON.parse(response.choices[0].message.content);
    res.json(parsedQuery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.recommend = async (req, res) => {
  const { source, destination, intent } = req.body;

  try {
    // Geocode source and destination
    const sourceCoords = await exports.locations({ query: { place: source } }, res, true);
    const destCoords = await exports.locations({ query: { place: destination } }, res, true);

    if (!sourceCoords || !destCoords) {
      return res.status(404).json({ message: 'Could not geocode source or destination' });
    }

    // Calculate distance
    const distance = getDistance(sourceCoords.lat, sourceCoords.lng, destCoords.lat, destCoords.lng);

    // Estimate travel options
    const options = [
      { mode: 'Bus', cost: Math.round(distance * 5), time: Math.round(distance * 3), comfort: 2 },
      { mode: 'Auto', cost: Math.round(distance * 15), time: Math.round(distance * 2), comfort: 3 },
      { mode: 'Cab', cost: Math.round(distance * 30), time: Math.round(distance * 1.5), comfort: 5 },
    ];

    // Add AI descriptions
    for (const option of options) {
      const response = await openai_api.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates a friendly, one-sentence description for a travel option based on its mode, cost, time, and comfort level (out of 5).'
          },
          {
            role: 'user',
            content: `Mode: ${option.mode}, Cost: ${option.cost}, Time: ${option.time} minutes, Comfort: ${option.comfort}/5`
          }
        ]
      });
      option.ai_description = response.choices[0].message.content;
    }

    // Sort options based on intent
    if (intent === 'cheapest') {
      options.sort((a, b) => a.cost - b.cost);
    } else if (intent === 'fastest') {
      options.sort((a, b) => a.time - b.time);
    } else if (intent === 'comfortable') {
      options.sort((a, b) => b.comfort - a.comfort);
    }

    res.json(options);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.locations = async (req, res, returnCoords = false) => {
  const { place } = req.query;

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${place}&format=json`
    );
    if (response.data.length === 0) {
      if (returnCoords) return null;
      return res.status(404).json({ message: 'Place not found' });
    }
    const { lat, lon } = response.data[0];
    if (returnCoords) return { lat, lng: lon };
    res.json({ lat, lng: lon });
  } catch (err) {
    console.error(err.message);
    if (returnCoords) throw err;
    res.status(500).send('Server error');
  }
};
