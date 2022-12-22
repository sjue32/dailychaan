import { ChangeEvent } from 'react';

interface message {
  err: string
}

export interface ServerError {
  log: string,
  status: number,
  message: message
}

export type CurrentUserProps = {
  loggedIn: boolean,
  username: string,
  posts: UserPostsProps[],
  fav_users: Record<string, unknown>
}

export interface CurrentUserContextValue {
  currentUser: CurrentUserProps,
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUserProps>>,
}

export type MobileContextValue = {
  isMobile: boolean,
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface PublicChaanProp {
  user_id: number,
  username: string,
  likes: number,
  likesData: LikesDataProp,
  url: string,
  caption: string,
  timestamp: string,
}

export type UserPostsProps = {
  user_id: number,
  username: string,
  likes: number,
  likesData?: LikesDataProp,
  url_small: string,
  url_large: string,
  caption: string,
  timestamp: string,
}

export type ExploreChaanListDataProps = {
  [userName: string] : ExploreChaanUserDataProps | undefined
};

export type ExploreChaanUserDataProps = {
  user_id: number
  username: string
}

export type ImageFrameProps = {
  id: string,
  key: string,
  imagePostMetadata: ImagePostProps
  // username: string,
  // user_id: number,
  // timestamp: string,
  // url: string
  // caption: string
  // likes: number,
  // likesData: LikesDataProp
  // home?: boolean,
  // style?: any,
  // setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export type ImagePostProps = {
  // id: string,
  username: string,
  user_id: number,
  timestamp: string,
  url_small: string,
  url_large: string,
  caption: string,
  likes: number,
  likesData: LikesDataProp
}

export type LikesDataProp = {
  [username: string]: string
}

// export type ImagePostTextProps = {
//   username: string,
//   timestamp: string,
//   likes: number,
//   likesData: LikesDataProp
//   caption: string,
//   user_id: number,
// }

// export type ImagePostMetaDataProps = {
//   user_id: number,
//   username: string,
//   timestamp: string,
//   likes: number,
//   likesData: LikesDataProp
//   caption: string,
//   url: string
// }

export type ChaanLinkButtonProps = {
  // key: string,
  username: string,
  user_id: number
}

export type CheckLoginProps = {
  username: string,
  password: string
};

// export type CheckLoginProps = details: LoginDetailProps

export type LoginDetailsProps = {
  username: string,
  password: string
};

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

export type LoginResponse = {
  verified: boolean,
  message: string,
  username?: string,
  user_posts?: UserPostsProps[],
  fav_users?: Record<string, unknown>
}

export interface GenericFunction {
  <Type>(arg: Type): Type;
}

export interface UsersData {
  username: string,
  user_id: number,
}

// export interface CurrentUserProps {
//   loggedIn: boolean,
//   username: string,
//   posts: Record<string, any>[],
//   fav_users: string[],
// }

export type likedPosts = string[];

declare module 'express-session' {
  interface SessionData {
    isAuthenticated: boolean;
    views: number;
    username: string;
  }
}

// export type RedisCLientType = ReturnType<typeof createClient>