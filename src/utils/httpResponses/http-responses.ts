import { HttpResponse } from "../../interfaces/http";
import { ServerError } from "../errors/server-error";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  // body: error,
});

export const notFound = (message: string): HttpResponse => ({
  statusCode: 404,
  // body: new NotFoundError(message),
});

export const conflict = (message: string): HttpResponse => ({
  statusCode: 409,
  // body: new ConflictError(message) 
});
export const insufficient = (message: string): HttpResponse => ({
  statusCode: 409,
  // body: new InsufficientError(message),
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string),
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
export const ok = (data?: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

