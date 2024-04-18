/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as SeedExhaustive from "../../../../../index";
import express from "express";
export interface EnumServiceMethods {
    getAndReturnEnum(req: express.Request<never, SeedExhaustive.types.WeatherReport, SeedExhaustive.types.WeatherReport, never>, res: {
        send: (responseBody: SeedExhaustive.types.WeatherReport) => Promise<void>;
        cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
        locals: any;
    }): void | Promise<void>;
}
export declare class EnumService {
    private readonly methods;
    private router;
    constructor(methods: EnumServiceMethods, middleware?: express.RequestHandler[]);
    addMiddleware(handler: express.RequestHandler): this;
    toRouter(): express.Router;
}
