/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
export declare const CreateProblemError: core.serialization.Schema<serializers.CreateProblemError.Raw, SeedTrace.CreateProblemError>;
export declare namespace CreateProblemError {
    type Raw = CreateProblemError.Generic;
    interface Generic extends serializers.GenericCreateProblemError.Raw {
        _type: "generic";
    }
}
