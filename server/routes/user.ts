import express, { Request, Response } from 'express';
const userService = require('../services/user.ts');

const router = express.Router();

// GET /users - Get a list of users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// GET /users/:id - Get a specific user
router.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

// POST /users - Create a new user
router.post('/users', async (req: Request, res: Response) => {
  try {
    const newUser = req.body;
    const user = await userService.createUser(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// PUT /users/:id - Update a user
router.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUserData = req.body;
    const updatedUser = await userService.updateUser(req.params.id, updatedUserData);
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// POST /users/:id/friends/:friendId - Add a friend
router.post('/users/:id/friends/:friendId', async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.addFriend(req.params.id, req.params.friendId);
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

// DELETE /users/:id/friends/:friendId - Remove a friend
router.delete('/users/:id/friends/:friendId', async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.removeFriend(req.params.id, req.params.friendId);
    if (!updatedUser) {
      return res.status(404).send('User not found');
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

module.exports = router;

