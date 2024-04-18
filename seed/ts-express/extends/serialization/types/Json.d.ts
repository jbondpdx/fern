/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../index";
import * as SeedExtends from "../../api/index";
import * as core from "../../core";
export declare const Json: core.serialization.ObjectSchema<serializers.Json.Raw, SeedExtends.Json>;
export declare namespace Json {
    interface Raw extends serializers.Docs.Raw {
        raw: string;
    }
}
