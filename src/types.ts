import { ChangeEvent } from "react"

interface message {
  err: string
}

export interface ServerError {
  log: string,
  status: number,
  message: message
}

export type ImageFrameProps = {
  id: string,
  key: string,
  username: string,
  user_id: number,
  timestamp: string,
  url: string
  caption: string
  likes: number,
  home?: boolean,
  style?: any,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export type ImagePostProp = {
  id: string,
  username: string,
  user_id: number,
  timestamp: string,
  url: string,
  caption: string,
  likes: number,
}

export type ImagePostTextProps = {
  username: string,
  timestamp: string,
  likes: number,
  caption: string,
  user_id: number,
}

export type ChaanLinkButtonProps = {
  // key: string,
  username: string,
  user_id: number
}

export type CheckLoginProps = {
  details: {
    username: string,
    password: String,
  },
  setStatus: React.Dispatch<React.SetStateAction<string>>,
  loggedInUser: LoggedInUserProp, 
  setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUserProp>>,
  setLoginMessage: React.Dispatch<React.SetStateAction<string>>
}

export type LoginInputProps = {
  id: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  loginInputData: LoginInputFieldProps
}

export type LoginInputFieldProps = {
  name: string,
  type: string,
  placeholder: string,
  pattern: string,
  errorMessage: string,
  required: boolean,
  htmlFor: string
}

export interface GenericFunction {
  <Type>(arg: Type): Type;
}

export interface PublicChaanProp {
  user_id: number,
  username: string,
  likes: number,
  url: string,
  caption: string,
  timestamp: string,
};

export interface UsersData {
  username: string,
  user_id: number,
}

export interface LoggedInUserProp {
  loggedIn: boolean,
  username: string,
  posts: Record<string, any>[],
  fav_users: string[],
  liked: Record<string, likedPosts>
}

export type likedPosts = string[];

declare module 'express-session' {
  interface SessionData {
    isAuthenticated: boolean;
    views: number;
    username: string;
  }
}

// export type RedisCLientType = ReturnType<typeof createClient>