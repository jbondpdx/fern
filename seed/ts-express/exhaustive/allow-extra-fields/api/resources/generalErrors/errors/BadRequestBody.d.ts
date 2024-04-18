/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as errors from "../../../../errors/index";
import * as SeedExhaustive from "../../../index";
import express from "express";
export declare class BadRequestBody extends errors.SeedExhaustiveError {
    private readonly body;
    constructor(body: SeedExhaustive.BadObjectRequestInfo);
    send(res: express.Response): Promise<void>;
}
