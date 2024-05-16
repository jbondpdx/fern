/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as serializers from "../../../index";
import * as FernDocsConfig from "../../../../api/index";
import * as core from "../../../../core";
import { VersionedSnippetLanguageConfiguration } from "./VersionedSnippetLanguageConfiguration";

export const SnippetLanguageConfiguration: core.serialization.Schema<
    serializers.SnippetLanguageConfiguration.Raw,
    FernDocsConfig.SnippetLanguageConfiguration
> = core.serialization.undiscriminatedUnion([core.serialization.string(), VersionedSnippetLanguageConfiguration]);

export declare namespace SnippetLanguageConfiguration {
    type Raw = string | VersionedSnippetLanguageConfiguration.Raw;
}
