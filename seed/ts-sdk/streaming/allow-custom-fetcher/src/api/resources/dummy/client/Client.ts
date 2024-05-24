/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as core from "../../../../core";
import * as SeedStreaming from "../../../index";
import * as serializers from "../../../../serialization/index";
import urlJoin from "url-join";
import * as stream from "stream";
import * as errors from "../../../../errors/index";

export declare namespace Dummy {
    interface Options {
        environment: core.Supplier<string>;
        fetcher?: core.FetchFunction;
    }

    interface RequestOptions {
        timeoutInSeconds?: number;
        maxRetries?: number;
        abortSignal?: AbortSignal;
    }
}

export class Dummy {
    constructor(protected readonly _options: Dummy.Options) {}

    public async generateStream(
        request: SeedStreaming.GenerateStreamRequestzs,
        requestOptions?: Dummy.RequestOptions
    ): Promise<core.Stream<SeedStreaming.StreamResponse>> {
        const _response = await (this._options.fetcher ?? core.fetcher)<stream.Readable>({
            url: urlJoin(await core.Supplier.get(this._options.environment), "generate-stream"),
            method: "POST",
            headers: {
                "X-Fern-Language": "JavaScript",
                "X-Fern-SDK-Name": "@fern/streaming",
                "X-Fern-SDK-Version": "0.0.1",
                "X-Fern-Runtime": core.RUNTIME.type,
                "X-Fern-Runtime-Version": core.RUNTIME.version,
            },
            contentType: "application/json",
            body: await serializers.GenerateStreamRequestzs.jsonOrThrow(request, { unrecognizedObjectKeys: "strip" }),
            responseType: "streaming",
            timeoutMs: requestOptions?.timeoutInSeconds != null ? requestOptions.timeoutInSeconds * 1000 : 2000,
            maxRetries: requestOptions?.maxRetries,
            abortSignal: requestOptions?.abortSignal,
        });
        if (_response.ok) {
            return new core.Stream({
                stream: _response.body,
                parse: async (data) => {
                    return await serializers.StreamResponse.parseOrThrow(data, {
                        unrecognizedObjectKeys: "passthrough",
                        allowUnrecognizedUnionMembers: true,
                        allowUnrecognizedEnumValues: true,
                        breadcrumbsPrefix: ["response"],
                    });
                },
                eventShape: {
                    type: "json",
                    messageTerminator: "\n",
                },
            });
        }

        if (_response.error.reason === "status-code") {
            throw new errors.SeedStreamingError({
                statusCode: _response.error.statusCode,
                body: _response.error.body,
            });
        }

        switch (_response.error.reason) {
            case "non-json":
                throw new errors.SeedStreamingError({
                    statusCode: _response.error.statusCode,
                    body: _response.error.rawBody,
                });
            case "timeout":
                throw new errors.SeedStreamingTimeoutError();
            case "unknown":
                throw new errors.SeedStreamingError({
                    message: _response.error.errorMessage,
                });
        }
    }
}
