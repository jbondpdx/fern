/**
 * This file was auto-generated by Fern from our API Definition.
 */
import * as SeedExhaustive from "../../../../../index";
export declare type Animal = SeedExhaustive.types.Animal.Dog | SeedExhaustive.types.Animal.Cat;
export declare namespace Animal {
    interface Dog extends SeedExhaustive.types.Dog {
        animal: "dog";
    }
    interface Cat extends SeedExhaustive.types.Cat {
        animal: "cat";
    }
}
