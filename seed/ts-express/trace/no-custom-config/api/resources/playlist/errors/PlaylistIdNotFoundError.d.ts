/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as errors from "../../../../errors/index";
import * as SeedTrace from "../../../index";
import express from "express";
export declare class PlaylistIdNotFoundError extends errors.SeedTraceError {
    private readonly body;
    constructor(body: SeedTrace.PlaylistIdNotFoundErrorBody);
    send(res: express.Response): Promise<void>;
}
