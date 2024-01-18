import express from 'express';
const friendRequestService = require('../services/friendRequestService');

const router = express.Router();

// GET all friend requests
router.get('/', async (req, res) => {
  try {
    const friendRequests = await friendRequestService.getFriendRequests();
    res.json(friendRequests);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET a single friend request by ID
router.get(':id', async (req, res) => {
  try {
    const friendRequest = await friendRequestService.getFriendRequestById(req.params.id);
    if (!friendRequest) {
      return res.status(404).send('Friend Request not found');
    }
    res.json(friendRequest);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET friend requests based on query parameters
router.get('/query', async (req, res) => {
    try {
      console.log('here')
      const params = req.query;
      console.log(params)
      const friendRequests = await friendRequestService.getFriendRequestsByParams(params);
      res.json(friendRequests);
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  });

// POST a new friend request
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const newFriendRequest = await friendRequestService.createFriendRequest(req.body);
    res.status(201).json(newFriendRequest);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// PUT to update a friend request
router.put(':id', async (req, res) => {
  try {
    const updatedFriendRequest = await friendRequestService.updateFriendRequest(req.params.id, req.body);
    if (!updatedFriendRequest) {
      return res.status(404).send('Friend Request not found');
    }
    res.json(updatedFriendRequest);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// DELETE a friend request
router.delete('/:id', async (req, res) => {
  try {
    const deletedFriendRequest = await friendRequestService.deleteFriendRequest(req.params.id);
    if (!deletedFriendRequest) {
      return res.status(404).send('Friend Request not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

module.exports = router;
