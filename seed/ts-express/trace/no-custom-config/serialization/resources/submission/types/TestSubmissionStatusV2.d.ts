/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
export declare const TestSubmissionStatusV2: core.serialization.ObjectSchema<serializers.TestSubmissionStatusV2.Raw, SeedTrace.TestSubmissionStatusV2>;
export declare namespace TestSubmissionStatusV2 {
    interface Raw {
        updates: serializers.TestSubmissionUpdate.Raw[];
        problemId: serializers.ProblemId.Raw;
        problemVersion: number;
        problemInfo: serializers.v2.ProblemInfoV2.Raw;
    }
}
