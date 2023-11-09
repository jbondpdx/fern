/**
 * This file was auto-generated by Fern from our API Definition.
 */

import express from "express";
import { LiteralService } from "./api/resources/literal/service/LiteralService";

export function register(
    expressApp: express.Express | express.Router,
    services: {
        literal: LiteralService;
    }
): void {
    (expressApp as any).use("/", services.literal.toRouter());
}
