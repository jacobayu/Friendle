import express from 'express';
const answerService = require('../services/answerService');

const router = express.Router();

// GET all answers
router.get('/', async (req, res) => {
  try {
    const answers = await answerService.getAnswers();
    res.json(answers);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET a single answer by ID
router.get('/:id', async (req, res) => {
  try {
    const answer = await answerService.getAnswerById(req.params.id);
    if (!answer) {
      return res.status(404).send('Answer not found');
    }
    res.json(answer);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET answers based on query parameters
router.get('/query', async (req, res) => {
    try {
      const params = req.query;  // Capture query params
      const answers = await answerService.getAnswersByParams(params);
      res.json(answers);
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  });

// POST a new answer
router.post('/', async (req, res) => {
  try {
    const newAnswer = await answerService.createAnswer(req.body);
    res.status(201).json(newAnswer);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// PUT to update an answer
router.put('/:id', async (req, res) => {
  try {
    const updatedAnswer = await answerService.updateAnswer(req.params.id, req.body);
    if (!updatedAnswer) {
      return res.status(404).send('Answer not found');
    }
    res.json(updatedAnswer);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// DELETE an answer
router.delete('/:id', async (req, res) => {
  try {
    const deletedAnswer = await answerService.deleteAnswer(req.params.id);
    if (!deletedAnswer) {
      return res.status(404).send('Answer not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

module.exports = router;
