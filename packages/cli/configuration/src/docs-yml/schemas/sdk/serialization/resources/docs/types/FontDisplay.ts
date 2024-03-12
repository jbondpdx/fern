/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../..";
import * as FernDocsConfig from "../../../../api";
import * as core from "../../../../core";

export const FontDisplay: core.serialization.Schema<serializers.FontDisplay.Raw, FernDocsConfig.FontDisplay> =
    core.serialization.enum_(["auto", "block", "swap", "fallback", "optional"]);

export declare namespace FontDisplay {
    type Raw = "auto" | "block" | "swap" | "fallback" | "optional";
}