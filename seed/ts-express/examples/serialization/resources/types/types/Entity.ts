/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as SeedExamples from "../../../../api/index";
import * as core from "../../../../core";

export const Entity: core.serialization.ObjectSchema<serializers.Entity.Raw, SeedExamples.Entity> =
    core.serialization.object({
        type: core.serialization.lazy(async () => (await import("../../..")).Type),
        name: core.serialization.string(),
    });

export declare namespace Entity {
    interface Raw {
        type: serializers.Type.Raw;
        name: string;
    }
}
