/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as SeedExamples from "../../../../../../api/index";
import * as core from "../../../../../../core";
export declare const EventInfo: core.serialization.Schema<serializers.commons.EventInfo.Raw, SeedExamples.commons.EventInfo>;
export declare namespace EventInfo {
    type Raw = EventInfo.Metadata | EventInfo.Tag;
    interface Metadata extends serializers.commons.Metadata.Raw {
        type: "metadata";
    }
    interface Tag {
        type: "tag";
        value: serializers.commons.Tag.Raw;
    }
}
