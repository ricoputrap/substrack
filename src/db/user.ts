import db from "@/clients/db";
import { USER } from "./schema";

export interface INewUser {
  email: string,
  password_hash: string,
  full_name: string
}

export async function createUser(data: INewUser) {
  const res = await db.insert(USER).values([data]).returning({ id: USER.id })

  return res;
}