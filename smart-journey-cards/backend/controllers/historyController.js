
const History = require('../models/History');

exports.saveHistory = async (req, res) => {
  const { userId, query, parsedQuery, selectedOption } = req.body;

  try {
    const history = new History({
      userId,
      query,
      parsedQuery,
      selectedOption,
    });

    await history.save();

    res.status(201).json({ message: 'History saved successfully' });
  } catch (err) {
    console.error(err.message);
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
