import { create } from "./create";
import { IUserAuthMethodDB } from "./types";
import { getByIdentifier } from "./getByIdentifier";

const UserAuthMethodDB: IUserAuthMethodDB = {
  getByIdentifier,
  create
}

export default UserAuthMethodDB;