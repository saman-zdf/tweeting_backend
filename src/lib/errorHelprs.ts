export interface ZodError {
  validation: string;
  code: string;
  message: string;
  path: string[];
}

export const mapZodError = (error: ZodError[]) => {
  const errorMessages = error.map((err: ZodError) => err.message);
  return errorMessages;
};

export const parseJson = (obj: string) => {
  return JSON.parse(obj);
};
