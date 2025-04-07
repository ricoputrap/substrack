import { NeonHttpQueryResult } from "drizzle-orm/neon-http";
import { TUserAuthMethodSelect, USER_AUTH_METHOD } from "./schema";
import db from "@/clients/db";
import { EnumAuthMethod } from "@/constants";

/**
 * Retrieves all user authentication methods associated with the given identifier.
 *
 * @param auth_identifier - The authentication identifier (e.g. email, Google ID, etc.)
 * @returns A list of user authentication methods associated with the given identifier.
 *
 * @throws Error - If there is an error during the query execution.
 */
export async function getUserAuthMethods(
  auth_identifier: string
): Promise<TUserAuthMethodSelect[]> {
  try {
    const result: NeonHttpQueryResult<TUserAuthMethodSelect> = await db.execute(`
      SELECT *
      FROM user_auth_method
      WHERE auth_identifier = '${auth_identifier}'
    `);
    return result.rows;
  }
  catch (error) {
    // log error properly
    console.error("[auth.ts] getUserAuthMethods - error:", error);
    return []
  }
}

export interface INewUserAuthMethod {
  user_id: number,
  auth_method: EnumAuthMethod,
  auth_identifier: string
}

/**
 * Inserts a new user authentication method into the database.
 *
 * @param data - An object containing the user authentication method details,
 * including user_id, auth_method, and auth_identifier.
 * 
 * @throws Error - If there is an error during the insertion process.
 */
export async function createUserAuthMethod(data: INewUserAuthMethod) {
  await db.insert(USER_AUTH_METHOD).values([data]);
}