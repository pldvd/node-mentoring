import express from 'express';
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  // get all users
  // use queryStrings limit and filter suggestions by loginSubstring => getAutoSuggestUsers(loginSubstring, limit)
  res.status(200).send('Allusers hello');
});

userRouter.get('/:id', (req, res) => {
  // get specific user
  res.status(200).send('GetOneUser hello');
});

userRouter.put('/:id', (req, res) => {
  // update user
  // add body validation
  res.status(200).send('Update user hello');
});

userRouter.delete('/:id', (req, res) => {
  // soft delete user
  res.status(200).send('Delete user hello');
});

userRouter.post('/', (req, res) => {
  // create new user
  // add body validation
  res.status(200).send('Add user hello');
});

export default userRouter;
