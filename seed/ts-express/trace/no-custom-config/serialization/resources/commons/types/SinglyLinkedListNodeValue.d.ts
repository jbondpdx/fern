/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../../index";
import * as SeedTrace from "../../../../api/index";
import * as core from "../../../../core";
export declare const SinglyLinkedListNodeValue: core.serialization.ObjectSchema<serializers.SinglyLinkedListNodeValue.Raw, SeedTrace.SinglyLinkedListNodeValue>;
export declare namespace SinglyLinkedListNodeValue {
    interface Raw {
        nodeId: serializers.NodeId.Raw;
        val: number;
        next?: serializers.NodeId.Raw | null;
    }
}
