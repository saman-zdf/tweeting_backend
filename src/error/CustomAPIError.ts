class CustomAPIError extends Error {
  message: string;
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
