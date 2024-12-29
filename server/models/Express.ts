import Express from "express";
import { Send, Query, ParamsDictionary } from "express-serve-static-core";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestParams<T extends ParamsDictionary>
  extends Express.Request {
  params: T;
}

export interface TypedRequest<U extends ParamsDictionary, T>
  extends Express.Request {
  params: U;
  body: T;
}

export interface TypedResponse<ResBody> extends Express.Response {
  json: Send<ResBody, this>;
}
