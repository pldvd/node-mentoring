import { IUser } from '../types';

export default class UserService {
  constructor() {} //pass userModel as this.userModel = userModel;

  async getUsers() {
    //ORM get logic, return all users this.userModell.getAll()
    return {};
  }

  async getUser(id: string) {
    //ORM get logic, return user
    return {};
  }

  async updateUser(id: string) {
    //ORM updat4e logic
    return {};
  }

  async deleteUser(id: string) {
    //ORM updat4e logic
    return {};
  }

  async createUser(userData: IUser) {
    //ORM updat4e logic
    return {};
  }
}
