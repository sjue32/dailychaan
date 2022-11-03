
interface message {
  err: string
}

export interface ServerError {
  log: string,
  status: number,
  message: message
}

export type ImageFrameProps = {
  key: string,
  user_id: number,
  timestamp: string,
  url: string
  caption: string
  likes: number,
  home: boolean,
  style?: any,
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
}

export type ImageFrameComponentProp = {
  user_id: number,
  timestamp: string,
  url: string
  caption: string
  likes: number,
}

export interface GenericFunction {
  <Type>(arg: Type): Type;
}

export interface PublicChaanProp {
  user_id: number,
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

