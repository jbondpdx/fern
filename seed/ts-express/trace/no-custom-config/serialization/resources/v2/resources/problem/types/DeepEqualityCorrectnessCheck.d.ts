/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../../../index";
import * as SeedTrace from "../../../../../../api/index";
import * as core from "../../../../../../core";
export declare const DeepEqualityCorrectnessCheck: core.serialization.ObjectSchema<serializers.v2.DeepEqualityCorrectnessCheck.Raw, SeedTrace.v2.DeepEqualityCorrectnessCheck>;
export declare namespace DeepEqualityCorrectnessCheck {
    interface Raw {
        expectedValueParameterId: serializers.v2.ParameterId.Raw;
    }
}
