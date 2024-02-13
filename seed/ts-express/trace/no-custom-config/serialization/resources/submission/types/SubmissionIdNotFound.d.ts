/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedTrace from "../../../../api";
import * as core from "../../../../core";
export declare const SubmissionIdNotFound: core.serialization.ObjectSchema<serializers.SubmissionIdNotFound.Raw, SeedTrace.SubmissionIdNotFound>;
export declare namespace SubmissionIdNotFound {
    interface Raw {
        missingSubmissionId: serializers.SubmissionId.Raw;
    }
}