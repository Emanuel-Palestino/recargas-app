export class UsernameNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UsernameNotFoundError";
  }
}

export class InvalidUsernameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidUsernameError";
  }
}
