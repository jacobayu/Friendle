import express from 'express';
const pairService = require('../services/pairService');

const router = express.Router();

// GET all pairs
router.get('/', async (req, res) => {
  try {
    const pairs = await pairService.getPairs();
    res.json(pairs);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET answers based on query parameters
router.get('/getByUser', async (req, res) => {
  try {
    const params = req.query;  // Capture query params
    const query = {users: {$all: [params.user1, params.user2]}}
    const answers = await pairService.getPairByParams(query);
    res.json(answers);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

router.get('/query', async (req, res) => {
  try {
    const params = req.query;
    console.log(params)
    const friendRequests = await pairService.getPairs(params);
    res.json(friendRequests);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET a single pair by ID
router.get('/:id', async (req, res) => {
  try {
    const pair = await pairService.getPairById(req.params.id);
    if (!pair) {
      return res.status(404).send('Pair not found');
    }
    res.json(pair);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST a new pair
router.post('/', async (req, res) => {
  try {
    const newPair = await pairService.createPair(req.body);
    res.status(201).json(newPair);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// PUT to update a pair
router.put('/:id', async (req, res) => {
  try {
    const updatedPair = await pairService.updatePair(req.params.id, req.body);
    if (!updatedPair) {
      return res.status(404).send('Pair not found');
    }
    res.json(updatedPair);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// DELETE a pair
router.delete('/:id', async (req, res) => {
  try {
    const deletedPair = await pairService.deletePair(req.params.id);
    if (!deletedPair) {
      return res.status(404).send('Pair not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

module.exports = router;
