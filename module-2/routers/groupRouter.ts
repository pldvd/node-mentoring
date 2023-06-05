import express from 'express';
import { StatusCodes } from 'http-status-codes';
import GroupService from '../services/groupService';
import { validateGroupData } from '../middleware/validators';

import Group from '../models/Group';

const groupRouter = express.Router();
export const groupService = new GroupService(Group);

groupRouter.get('/', (req, res, next) => {
  groupService
    .getGroups()
    .then((groups) => {
      res.status(StatusCodes.OK).json(groups);
    })
    .catch(next);
});

groupRouter.get('/:id', (req, res, next) => {
  const { id } = req.params;

  groupService
    .getGroup(id)
    .then((group) => {
      group === null
        ? res.status(StatusCodes.NOT_FOUND).send('Group not found.')
        : res.status(StatusCodes.OK).json(group);
    })
    .catch(next);
});

groupRouter.put('/:id', validateGroupData, (req, res, next) => {
  const { id } = req.params;

  groupService
    .updateGroup(id, req.body)
    .then(([affectedCount]) => {
      affectedCount === 0
        ? res.status(StatusCodes.NOT_FOUND).send('Group not found.')
        : res
            .status(StatusCodes.OK)
            .send(`Group with id: ${id} was updated successfully.`);
    })
    .catch(next);
});

groupRouter.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  groupService
    .deleteGroup(id)
    .then((affetedCount) => {
      affetedCount === 0
        ? res.status(StatusCodes.NOT_FOUND).send('Group not found.')
        : res
            .status(StatusCodes.OK)
            .send(`Group with id: ${id} was removed successfully.`);
    })
    .catch(next);
});

groupRouter.post('/', validateGroupData, (req, res, next) => {
  groupService
    .createGroup(req.body)
    .then((newGroup) => res.status(StatusCodes.CREATED).json(newGroup))
    .catch(next);
});

export default groupRouter;
