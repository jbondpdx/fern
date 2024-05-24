/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core";
import urlJoin from "url-join";
import * as errors from "../../../../errors/index";

export declare namespace Service {
    interface Options {
        environment: core.Supplier<string>;
        id: string;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
        abortSignal?: AbortSignal;
    }
}

export class Service {
    constructor(protected readonly _options: Service.Options) {}

    /**
     * @param {string} nestedId
     * @param {Service.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @example
     *     await seedPackageYml.service.nop("id-219xca8")
     */
    public async nop(nestedId: string, requestOptions?: Service.RequestOptions): Promise<void> {
        const _response = await core.fetcher({
            url: urlJoin(
                await core.Supplier.get(this._options.environment),
                `/${encodeURIComponent(this._options.id)}//${encodeURIComponent(nestedId)}`
            ),
            method: "GET",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/package-yml",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return;
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedPackageYmlError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedPackageYmlError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedPackageYmlTimeoutError();
            case "unknown":
                throw new errors.SeedPackageYmlError({
                    message: _response.error.errorMessage,
                });
        }
    }
}
