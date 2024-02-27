/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core";
import * as SeedAudiences from "../../..";
import * as serializers from "../../../../serialization";
import * as errors from "../../../../errors";

export declare namespace Foo {
    interface Options {
        environment: core.Supplier<string>;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
    }
}

export class Foo {
    constructor(protected readonly _options: Foo.Options) {}

    public async find(
        request: SeedAudiences.FindRequest = {},
        requestOptions?: Foo.RequestOptions
    ): Promise<SeedAudiences.ImportingType> {
        const { optionalString, ..._body } = request;
        const _queryParams: Record<string, string | string[] | object | object[]> = {};
        if (optionalString != null) {
            _queryParams["optionalString"] = optionalString;
        }

        const _response = await core.fetcher({
            url: await core.Supplier.get(this._options.environment),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            queryParameters: _queryParams,
            body: await serializers.FindRequest.jsonOrThrow(_body, { unrecognizedObjectKeys: "strip" }),
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 60000,
            maxRetries: requestOptions?.maxRetries,
        });
        if (_response.ok) {
            return await serializers.ImportingType.parseOrThrow(_response.body, {
                unrecognizedObjectKeys: "passthrough",
                allowUnrecognizedUnionMembers: true,
                allowUnrecognizedEnumValues: true,
                breadcrumbsPrefix: ["response"],
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedAudiencesError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedAudiencesError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedAudiencesTimeoutError();
            case "unknown":
                throw new errors.SeedAudiencesError({
                    message: _response.error.errorMessage,
                });
        }
    }
}
