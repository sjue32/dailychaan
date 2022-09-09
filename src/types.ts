interface message {
  err: string
}

export interface ServerError {
  log: string,
  status: number,
  message: message
}

export type ImageFrameProps = {
  imgUrl: string
  alt?: string
  caption?: string
}