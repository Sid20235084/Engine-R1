import generateCode from '../services/ai.service.js';

export const getResponse = async (req, res) => {
  try {
    const { Instructions } = req.body;

    if (!Instructions) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const response = await generateCode(Instructions);
    res.json(response);
  } catch (error) {
    console.error('Error in getReview:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
