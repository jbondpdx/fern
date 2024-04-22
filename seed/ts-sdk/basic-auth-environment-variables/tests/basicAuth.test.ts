/**
 * This file was auto-generated by Fern from our API Definition.
 */

import { SeedBasicAuthEnvironmentVariablesClient } from "../src/Client";

const client = new SeedBasicAuthEnvironmentVariablesClient({
    environment: process.env.TESTS_BASE_URL || "test",
    username: process.env.TESTS_USERNAME || "test",
    password: process.env.TESTS_PASSWORD || "test",
});

describe("BasicAuth", () => {
    test("getWithBasicAuth", async () => {
        const response = await client.basicAuth.getWithBasicAuth();
        expect(response).toEqual(true);
    });

    test("postWithBasicAuth", async () => {
        const response = await client.basicAuth.postWithBasicAuth({
            key: "value",
        });
        expect(response).toEqual(true);
    });
});