export interface ISignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface ISigninCredentials {
  username: string;
  password: string;
}

export interface ICurrentUser {
  username: string;
}

export interface ISignedinDetails {
  authenticated: boolean;
  username: string;
}
