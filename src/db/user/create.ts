import db from "@/clients/db";
import { USER } from "@/db/schema";
import { INewUser } from "./types";

/**
 * Inserts a new user into the database.
 *
 * @param data - An object containing the user details to be inserted.
 *
 * @returns The ID of the newly inserted user.
 *
 * @throws Error - If there is an error during the insertion process.
 */
export async function create(data: INewUser): Promise<number> {
  const res = await db.insert(USER).values([data]).returning({ id: USER.id })
  return res[0].id;
}