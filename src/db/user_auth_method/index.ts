import { createNew } from "./createNew";
import { getByIdentifier } from "./getByIdentifier";
import { IUserAuthMethodDB } from "./types";

const UserAuthMethodDB: IUserAuthMethodDB = {
  getByIdentifier,
  createNew
}

export default UserAuthMethodDB;