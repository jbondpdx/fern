/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as serializers from "../../..";
import * as SeedUnions from "../../../../api";
import * as core from "../../../../core";
export declare const Union: core.serialization.Schema<serializers.Union.Raw, SeedUnions.Union>;
export declare namespace Union {
    type Raw = Union.Foo | Union.Bar;
    interface Foo {
        type: "foo";
        foo: serializers.Foo.Raw;
    }
    interface Bar {
        type: "bar";
        bar: serializers.Bar.Raw;
    }
}