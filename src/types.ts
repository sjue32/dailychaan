interface message {
  err: string
}

export interface ServerError {
  log: string,
  status: number,
  message: message
}