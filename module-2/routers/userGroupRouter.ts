import express from 'express';
import { StatusCodes } from 'http-status-codes';
import UserGroup from '../models/UserGroup';
import UserGroupService from '../services/userGroupService';

const userGroupRouter = express.Router();
const userGroupService = new UserGroupService(UserGroup);

userGroupRouter.get('/', (req, res, next) => {
  userGroupService
    .getAll()
    .then((userGroups) => {
      res.status(StatusCodes.OK).json(userGroups);
    })
    .catch(next);
});

userGroupRouter.post('/add', (req, res, next) => {
  const groupId = req.body.groupId as string;
  const userIds = req.body.userIds as string[];

  userGroupService
    .addUsersToGroup(groupId, userIds)
    .then((data) => {
      res.status(StatusCodes.CREATED).json(data);
    })
    .catch(next);
});

export default userGroupRouter;
