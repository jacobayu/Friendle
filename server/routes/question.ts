import express from 'express';
const questionService = require('../services/questionService.ts');

const router = express.Router();

// GET all questions
router.get('/', async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});


// GET answers based on query parameters
router.get('/query', async (req, res) => {
  try {
    const params = req.query;  // Capture query params
    const answers = await questionService.getQuestionsByParams(params);
    res.json(answers);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET a single question by ID
router.get('/:id', async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).send('Question not found');
    }
    res.json(question);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST a new question
router.post('/', async (req, res) => {
  try {
    const newQuestion = await questionService.createQuestion(req.body);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// PUT to update a question
router.put('/:id', async (req, res) => {
  try {
    const updatedQuestion = await questionService.updateQuestion(req.params.id, req.body);
    if (!updatedQuestion) {
      return res.status(404).send('Question not found');
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// DELETE a question
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuestion = await questionService.deleteQuestion(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).send('Question not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

module.exports = router;
