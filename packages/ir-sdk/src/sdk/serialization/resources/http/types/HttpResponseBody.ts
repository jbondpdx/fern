/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernIr from "../../../../api";
import * as core from "../../../../core";

export const HttpResponseBody: core.serialization.Schema<serializers.HttpResponseBody.Raw, FernIr.HttpResponseBody> =
    core.serialization
        .union("type", {
            json: core.serialization.object({
                value: core.serialization.lazy(async () => (await import("../../..")).JsonResponse),
            }),
            fileDownload: core.serialization.lazyObject(async () => (await import("../../..")).FileDownloadResponse),
            text: core.serialization.lazyObject(async () => (await import("../../..")).TextResponse),
            streaming: core.serialization.object({
                value: core.serialization.lazy(async () => (await import("../../..")).StreamingResponse),
            }),
        })
        .transform<FernIr.HttpResponseBody>({
            transform: (value) => {
                switch (value.type) {
                    case "json":
                        return FernIr.HttpResponseBody.json(value.value);
                    case "fileDownload":
                        return FernIr.HttpResponseBody.fileDownload(value);
                    case "text":
                        return FernIr.HttpResponseBody.text(value);
                    case "streaming":
                        return FernIr.HttpResponseBody.streaming(value.value);
                    default:
                        return value as FernIr.HttpResponseBody;
                }
            },
            untransform: ({ _visit, ...value }) => value as any,
        });

export declare namespace HttpResponseBody {
    type Raw =
        | HttpResponseBody.Json
        | HttpResponseBody.FileDownload
        | HttpResponseBody.Text
        | HttpResponseBody.Streaming;

    interface Json {
        type: "json";
        value: serializers.JsonResponse.Raw;
    }

    interface FileDownload extends serializers.FileDownloadResponse.Raw {
        type: "fileDownload";
    }

    interface Text extends serializers.TextResponse.Raw {
        type: "text";
    }

    interface Streaming {
        type: "streaming";
        value: serializers.StreamingResponse.Raw;
    }
}
