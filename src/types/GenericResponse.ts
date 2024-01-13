export type GenericResponse<T> = {
  errors: [];
  data: T;
  message: string;
  statusCode: number;
  success: boolean;
} | null;
