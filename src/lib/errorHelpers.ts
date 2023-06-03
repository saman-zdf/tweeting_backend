export interface ZodError {
  validation: string;
  code: string;
  message: string;
  path: string[];
  receive?: string;
  exact?: boolean;
  inclusive?: boolean;
  type?: string;
  minimum?: number;
  maximum?: number;
}

export const mapZodError = (error: ZodError[]) => error.map((err: ZodError) => err.message);

export const parseJson = (obj: string) => JSON.parse(obj);
