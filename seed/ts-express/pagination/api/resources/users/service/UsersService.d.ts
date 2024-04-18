/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as SeedPagination from "../../../index";
import express from "express";
export interface UsersServiceMethods {
    listWithCursorPagination(req: express.Request<never, SeedPagination.ListUsersPaginationResponse, never, {
        page?: number;
        per_page?: number;
        order?: SeedPagination.Order;
        starting_after?: string;
    }>, res: {
        send: (responseBody: SeedPagination.ListUsersPaginationResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    listWithOffsetPagination(req: express.Request<never, SeedPagination.ListUsersPaginationResponse, never, {
        page?: number;
        per_page?: number;
        order?: SeedPagination.Order;
        starting_after?: string;
    }>, res: {
        send: (responseBody: SeedPagination.ListUsersPaginationResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    listWithExtendedResults(req: express.Request<never, SeedPagination.ListUsersExtendedResponse, never, {
        cursor?: string;
    }>, res: {
        send: (responseBody: SeedPagination.ListUsersExtendedResponse) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    listUsernames(req: express.Request<never, SeedPagination.UsernameCursor, never, {
        starting_after?: string;
    }>, res: {
        send: (responseBody: SeedPagination.UsernameCursor) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
    listWithGlobalConfig(req: express.Request<never, SeedPagination.UsernameContainer, never, {
        offset?: number;
    }>, res: {
        send: (responseBody: SeedPagination.UsernameContainer) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class UsersService {
    private readonly methods;
    private router;
    constructor(methods: UsersServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}
