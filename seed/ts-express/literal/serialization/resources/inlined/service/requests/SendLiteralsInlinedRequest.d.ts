/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../index";
import * as SeedLiteral from "../../../../../api/index";
import * as core from "../../../../../core";
export declare const SendLiteralsInlinedRequest: core.serialization.Schema<serializers.SendLiteralsInlinedRequest.Raw, SeedLiteral.SendLiteralsInlinedRequest>;
export declare namespace SendLiteralsInlinedRequest {
    interface Raw {
        prompt: "You are a helpful assistant";
        query: string;
        temperature?: number | null;
        stream: false;
    }
}
