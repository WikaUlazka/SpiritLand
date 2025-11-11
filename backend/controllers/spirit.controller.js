import { Spirit } from '../models/index.js';

export const getSpirits = async (req, res) => {
  try {
    const spirits = await Spirit.findAll();
    res.json(spirits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createSpirit = async (req, res) => {
  try {
    const newSpirit = await Spirit.create(req.body);
    res.status(201).json(newSpirit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
