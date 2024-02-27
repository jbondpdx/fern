/**
 * This file was auto-generated by Fern from our API Definition.
 */

import * as SeedQueryParameters from "../../../..";

export interface GetUsersRequest {
    limit: number;
    id: string;
    date: string;
    deadline: string;
    bytes: string;
    user: SeedQueryParameters.User;
    keyValue: Record<string, string>;
    optionalString?: string;
    nestedUser: SeedQueryParameters.NestedUser;
    excludeUser: SeedQueryParameters.User | SeedQueryParameters.User[];
    filter: string | string[];
}
