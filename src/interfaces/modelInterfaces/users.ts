export interface IUserSignupModel {
  username: string,
  email: string,
  password: string
}

export interface IUserLoginModel {
  email: string,
  password: string
}

export interface ITokenDataModel {
  _id: string,
  email: string,
  username: string
}

export interface IVerifyEmailParamsModel {
  token: string
}