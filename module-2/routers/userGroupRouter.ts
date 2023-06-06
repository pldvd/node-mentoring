import express from 'express';
import UserGroup from '../models/UserGroup';
import UserGroupService from '../services/userGroupService';

const userGroupRouter = express.Router();
const userGroupService = new UserGroupService(UserGroup);

userGroupRouter.get('/', (req, res, next) => {
  userGroupService
    .getAll()
    .then((userGroups) => {
      res.status(200).json(userGroups);
    })
    .catch(next);
});

export default userGroupRouter;
