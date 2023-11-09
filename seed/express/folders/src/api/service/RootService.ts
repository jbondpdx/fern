/**
 * This file was auto-generated by Fern from our API Definition.
 */

import express from "express";
import * as errors from "../../errors";

export interface RootServiceMethods {
    foo(
        req: express.Request<never, never, never, never>,
        res: {
            send: () => Promise<void>;
            cookie: (cookie: string, value: string, options?: express.CookieOptions) => void;
            locals: any;
        }
    ): void | Promise<void>;
}

export class RootService {
    private router;

    constructor(private readonly methods: RootServiceMethods, middleware: express.RequestHandler[] = []) {
        this.router = express.Router({ mergeParams: true }).use(
            express.json({
                strict: false,
            }),
            ...middleware
        );
    }

    public addMiddleware(handler: express.RequestHandler): this {
        this.router.use(handler);
        return this;
    }

    public toRouter(): express.Router {
        this.router.post("", async (req, res, next) => {
            try {
                await this.methods.foo(req as any, {
                    send: async () => {
                        res.sendStatus(204);
                    },
                    cookie: res.cookie.bind(res),
                    locals: res.locals,
                });
                next();
            } catch (error) {
                console.error(error);
                if (error instanceof errors.SeedApiError) {
                    console.warn(
                        `Endpoint 'foo' unexpectedly threw ${error.constructor.name}.` +
                            ` If this was intentional, please add ${error.constructor.name} to` +
                            " the endpoint's errors list in your Fern Definition."
                    );
                    await error.send(res);
                } else {
                    res.status(500).json("Internal Server Error");
                }
                next(error);
            }
        });
        return this.router;
    }
}
