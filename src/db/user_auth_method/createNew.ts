import { USER_AUTH_METHOD } from "@/db/schema";
import { INewUserAuthMethod } from "./types";
import db from "@/clients/db";

/**
 * Inserts a new user authentication method into the database.
 *
 * @param data - An object containing the user authentication method details,
 * including user_id, auth_method, and auth_identifier.
 * 
 * @throws Error - If there is an error during the insertion process.
 */
export async function createNew(data: INewUserAuthMethod) {
  await db.insert(USER_AUTH_METHOD).values([data]);
}