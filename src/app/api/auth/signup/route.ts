import { EnumAuthMethod, EnumHttpStatus } from '@/constants';
import { TUserAuthMethodSelect } from '@/db/schema';
import { createUser } from '@/db/user';
import { createUserAuthMethod, getUserAuthMethods } from '@/db/user_auth_method';
import { createErrorResponse, createResponse } from '@/lib/utils/api';
import { saltAndHashPassword } from '@/lib/utils/auth';
import { NeonDbError } from '@neondatabase/serverless';
import { redirect } from 'next/navigation'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  full_name: z.string({ required_error: "Full name is required" })
    .min(1, "Full name is required")
    .max(255, "Full name must be less than 255 characters")
});

interface IResponseBody {
  data: TUserAuthMethodSelect[]
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // validate form data
    const validatedFields = signUpSchema.safeParse(body);

    // validation is failed
    if (!validatedFields.success) {
      return createErrorResponse(
        EnumHttpStatus.BAD_REQUEST,
        "Validation failed for one or more fields.",
        validatedFields.error.flatten().fieldErrors
      );
    }

    // find all `USER_AUTH_METHOD` by the email
    const userAuthMethods: TUserAuthMethodSelect[] = await getUserAuthMethods(validatedFields.data.email);

    // email has been registered
    if (userAuthMethods.length > 0) {

      // find one with `auth_method = "credentials"`
      const authMethodCredentials = userAuthMethods.find((item) => {
        return item.auth_method == EnumAuthMethod.CREDENTIALS;
      });

      // email is already used by somebody
      if (!!authMethodCredentials) {
        return createErrorResponse(
          EnumHttpStatus.CONFLICT,
          "Email already exists."
        );
      }

      return createResponse<IResponseBody>(
        EnumHttpStatus.ACCEPTED,
        { data: userAuthMethods },
      )
    }

    // hash the password
    const password_hash = await saltAndHashPassword(validatedFields.data.password);

    // create a new user
    const newUserID = await createUser({
      email: validatedFields.data.email,
      password_hash: password_hash,
      full_name: validatedFields.data.full_name
    })

    // create a new USER_AUTH_METHOD record
    await createUserAuthMethod({
      user_id: newUserID,
      auth_method: EnumAuthMethod.CREDENTIALS,
      auth_identifier: validatedFields.data.email
    });
  }
  catch (error) {
    // todo log error properly
    console.error("[/api/signup] POST error:", error)

    if (error instanceof NeonDbError) {
      if (error.constraint === "user_email_unique") {
        return createErrorResponse(
          EnumHttpStatus.CONFLICT,
          "Email already exists",
        );
      }

      // TODO identify & handle other possible values of `error.constraint`

      return createErrorResponse(
        EnumHttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }

    return createErrorResponse(
      EnumHttpStatus.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred. Please try again later.",
    );
  }

  // success and redirect
  redirect("/login")
}