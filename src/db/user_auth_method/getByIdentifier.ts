import { NeonHttpQueryResult } from "drizzle-orm/neon-http";
import { TUserAuthMethodSelect } from "@/db/schema";
import db from "@/clients/db";

/**
 * Retrieves all user authentication methods associated with the given identifier.
 *
 * @param auth_identifier - The authentication identifier (e.g. email, Google ID, etc.)
 * @returns A list of user authentication methods associated with the given identifier.
 *
 * @throws Error - If there is an error during the query execution.
 */
export async function getByIdentifier(
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
    console.error("[UserAuthMethodDB] getByIdentifier - error:", error);
    return []
  }
}