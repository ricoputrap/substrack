export interface INewUser {
  email: string,
  password_hash: string,
  full_name: string
}

export interface IUserDB {
  create: (data: INewUser) => Promise<number>;
}