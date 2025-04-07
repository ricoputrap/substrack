import { EnumAuthMethod } from "@/constants";
import { TUserAuthMethodSelect } from "@/db/schema";

export interface INewUserAuthMethod {
  user_id: number,
  auth_method: EnumAuthMethod,
  auth_identifier: string
}

export interface IUserAuthMethodDB {
  getByIdentifier: (auth_identifier: string) => Promise<TUserAuthMethodSelect[]>;
  create: (data: INewUserAuthMethod) => Promise<void>;
}