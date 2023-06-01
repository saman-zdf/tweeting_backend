class CustomAPIError extends Error {
  message!: string;
  constructor(message: string) {
    super(message);
  }
}

export default CustomAPIError;
