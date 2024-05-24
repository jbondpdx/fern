/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "./core";
import { Service } from "./api/resources/service/client/Client";

export declare namespace SeedCodeSamplesClient {
    interface Options {
        environment: core.Supplier<string>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
        abortSignal?: AbortSignal;
    }
}

export class SeedCodeSamplesClient {
    constructor(protected readonly _options: SeedCodeSamplesClient.Options) {}

    protected _service: Service | undefined;

    public get service(): Service {
        return (this._service ??= new Service(this._options));
    }
}
