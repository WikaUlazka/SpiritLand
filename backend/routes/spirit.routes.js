import express from 'express';
import { getSpirits, createSpirit } from '../controllers/spirit.controller.js';

const router = express.Router();

// GET → wszystkie duchy
router.get('/', getSpirits);

// POST → dodaj nowego ducha
router.post('/', createSpirit);

export default router;
