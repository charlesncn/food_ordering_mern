import { Express, RequestHandler, Request as ExpReq, Response as ExpRes } from 'express';
import * as Joi from 'joi';
export interface Route<Req = {}, Res = any, Params = {}, Query = {}> {
    middleware?: RequestHandler[];
    validate?: (joi: typeof Joi) => {
        body?: Partial<Record<keyof Req, Joi.Schema>>;
        params?: Partial<Record<keyof Params, Joi.Schema>>;
        query?: Partial<Record<keyof Query, Joi.Schema>>;
    };
    handler?: (req: ExpReq<Params, Res, Req, Query>, res: ExpRes<Res>) => Promise<Res | ExpRes<Res>> | Res | ExpRes<Res>;
}
export declare type RouteTypes = 'get' | 'post' | 'put' | 'delete' | 'options' | 'head' | 'connect' | 'trace' | 'patch';
export declare type DefineRoutesOptions = Partial<Record<RouteTypes, ReturnType<typeof defineRoute>>>;
export declare const defineRoutes: (opts: DefineRoutesOptions) => Partial<Record<RouteTypes, Route<unknown, unknown, unknown, unknown>>>;
export declare const defineRoute: <Req = {}, Res = any, Params = {}, Query = {}>(opts: Route<Req, Res, Params, Query>) => Route<Req, Res, Params, Query>;
export declare const parseRouteDefinition: (app: Express, path: string, route: Route, type: RouteTypes) => Express;
export declare const createRoutes: (app: Express, dir?: string) => Promise<Express>;
