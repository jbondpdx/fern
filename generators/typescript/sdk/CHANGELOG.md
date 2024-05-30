# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.20.5] - 2024-05-30

- Fix: This updates the behavior of the failure condition introduced in `0.20.2`; the SDK
  now throws an error whenever we fail to refresh an access token even if `neverThrowErrors`
  is set. We treat this failure as a systematic exception, so it's OK to throw in this case.

## [0.20.4] - 2024-05-29

- Fix: Functionality to generate integration tests against a mock server has been disabled.

## [0.20.2] - 2024-05-29

- Fix: The OAuth token provider supports SDKs that enable the `neverThrowErrors` setting.
  If the OAuth token provider fails to retrieve and/or refresh an access token, an error
  will _not_ be thrown. Instead, the original access token will be used and the user will be
  able to act upon an error available on the response. For example,

  ```ts
  const response = await client.user.get(...)
  if (!response.ok) {
    // Handle the response.error ...
  }
  ```

## [0.20.1] - 2024-05-29

- Fix: Remove instances of `node:stream` so that the generated SDK is Webpack + Next.js compatible.

## [0.20.1-rc0] - 2024-05-29

- (Pre-emptive) Fix: URL encoded bodies are now appropriately encoded within the fetcher.

## [0.20.0-rc1] - 2024-05-24

- Fix: Pass `abortSignal` to `Stream` for server-sent-events and JSON streams so that the user
  can opt out and break from a stream.

## [0.20.0-rc0] - 2024-05-24

- Feature: Add `abortSignal` to `RequestOptions`. SDK consumers can now specify an
  an arbitrary abort signal that can interrupt the API call.

  ```ts
  const controller = new AbortController();
  client.endpoint.call(..., {
    abortSignal: controller.signal,
  })
  ```

## [0.19.0] - 2024-05-20

- Feature: Add `inlineFileProperties` configuration to support generating file upload properties
  as in-lined request properties (instead of positional parameters). Simply configure the following:

  ```yaml
  - name: fernapi/fern-typscript-node-sdk
    version: 0.19.0
    ...
    config:
      inlineFileProperties: true
  ```

  **Before**:

  ```ts
  /**
    * @param {File | fs.ReadStream} file
    * @param {File[] | fs.ReadStream[]} fileList
    * @param {File | fs.ReadStream | undefined} maybeFile
    * @param {File[] | fs.ReadStream[] | undefined} maybeFileList
    * @param {Acme.MyRequest} request
    * @param {Service.RequestOptions} requestOptions - Request-specific configuration.
    *
    * @example
    *     await client.service.post(fs.createReadStream("/path/to/your/file"), [fs.createReadStream("/path/to/your/file")], fs.createReadStream("/path/to/your/file"), [fs.createReadStream("/path/to/your/file")], {})
    */
  public async post(
      file: File | fs.ReadStream,
      fileList: File[] | fs.ReadStream[],
      maybeFile: File | fs.ReadStream | undefined,
      maybeFileList: File[] | fs.ReadStream[] | undefined,
      request: Acme.MyRequest,
      requestOptions?: Acme.RequestOptions
  ): Promise<void> {
    ...
  }
  ```

  **After**:

  ```ts
  /**
    * @param {Acme.MyRequest} request
    * @param {Service.RequestOptions} requestOptions - Request-specific configuration.
    *
    * @example
    *     await client.service.post({
    *        file: fs.createReadStream("/path/to/your/file"),
    *        fileList: [fs.createReadStream("/path/to/your/file")]
    *     })
    */
  public async post(
      request: Acme.MyRequest,
      requestOptions?: Service.RequestOptions
  ): Promise<void> {
    ...
  }
  ```

## [0.18.3] - 2024-05-17

- Internal: The generator now uses the latest FDR SDK.

## [0.18.2] - 2024-05-15

- Fix: If OAuth is configured, the generated `getAuthorizationHeader` helper now treats the
  bearer token as optional. This prevents us from sending the `Authorization` header
  when retrieving the access token.

## [0.18.1] - 2024-05-14

- Fix: If OAuth environment variables are specified, the `clientId` and `clientSecret` parameters
  are optional.

  ```ts
  export declare namespace Client {
    interface Options {
        ...
        clientId?: core.Supplier<string>;
        clientSecret?: core.Supplier<string>;
    }
    ...
  }
  ```

## [0.18.0] - 2024-05-13

- Feature: Add support for the OAuth client credentials flow. The new `OAuthTokenProvider` automatically
  resolves the access token and refreshes it as needed. The resolved access token is then used as the
  bearer token in all client requests.

## [0.17.1] - 2024-05-06

- Fix: Multipart form data requests are now compatible across browser and Node.js runtimes.

## [0.17.0] - 2024-05-06

- Internal: Bump to v43 of IR which means that you will need `0.26.1` of the Fern CLI version. To bump your
  CLI version, please run `fern upgrade`.

## [0.16.0-rc8] - 2024-05-06

- Improvement: The SDK generator now supports upload endpoints that specify an array of files like so:

  ```ts
  /**
    * @param {File[] | fs.ReadStream[]} files
    * @param {Acme.UploadFileRequest} request
    * @param {Service.RequestOptions} requestOptions - Request-specific configuration.
    */
  public async post(
      files: File[] | fs.ReadStream[],
      request: Acme.UploadFileRequest,
      requestOptions?: Service.RequestOptions
  ): Promise<void> {
      const _request = new FormData();
      for (const _file of files) {
        _request.append("files", _file);
      }
      ...
  }
  ```

## [0.16.0-rc7] - 2024-05-02

- Improvement: The SDK generator now supports `@param` JSDoc comments for endpoint parameters.
  The generator now arranges JSDoc in a few separate groups, one for each of `@param`, `@throws`,
  and `@examples` like so:

  ```ts
    /**
     * This endpoint checks the health of a resource.
     *
     * @param {string} id - A unique identifier.
     * @param {Service.RequestOptions} requestOptions - Request-specific configuration.
     *
     * @throws {@link Acme.UnauthorizedRequest}
     * @throws {@link Acme.BadRequest}
     *
     * @example
     *     await testSdk.health.service.check("id-2sdx82h")
     */
    public async check(id: string, requestOptions?: Service.RequestOptions): Promise<void> {
      ...
    }
  ```

- Improvement: The generator will only include user-provided examples if they exist, and otherwise
  only include a single generated example, like so:

  ```ts
    /**
     * This endpoint checks the health of a resource.
     *
     * @example
     *     await testSdk.health.service.check("id-2sdx82h")
     */
    public async check(id: string, requestOptions?: Service.RequestOptions): Promise<void> {
      ...
    }
  ```

- Fix: The SDK generator now escapes path parameters that would previously create invalid
  URLs (e.g. "\\example"). Method implementations will now have references to
  `encodeURIComponent` like the following:

  ```ts
  const _response = await core.fetcher({
    url: urlJoin(
      (await core.Supplier.get(this._options.environment)) ?? environments.AcmeEnvironment.Prod,
      `/users/${encodeURIComponent(userId)}`
    ),
    ...
  });
  ```

## [0.16.0-rc6] - 2024-04-30

- Fix: snippet templates now move file upload parameters to unnamed args

## [0.16.0-rc5] - 2024-04-30

- Fix: remove duplicate quotation marks in snippet templates

## [0.16.0-rc4] - 2024-04-25

- Fix: fixes to styling of the SDK code snippet templates.

## [0.16.0-rc0] - 2024-04-24

- Feature: The generator now registers snippet templates which can be used for dynamic
  SDK code snippet generation.

## [0.15.1-rc1] - 2024-04-24

- Improvement: Earlier for inlined request exports, we were doing the following:

```ts
export { MyRequest } from "./MyRequest";
```

In an effort to make the generated code JSR compatible, the TS generator
will now append the `type` explicitly for request exports.

```ts
export { type MyRequest } from "./MyRequest";
```

## [0.15.1-rc0] - 2024-04-22

- Feature: plain text responses are now supported in the TypeScript generator.

## [0.15.0-rc1] - 2024-04-22

- Fix: Minor fixes to SSE processing. In particular, stream terminal characters are now
  respected like `[DONE]` and JSON parsed data is sent to the deserialize function.

## [0.15.0-rc0] - 2024-04-19

- Feature: Bump to v38 of IR and support server-sent events where the events are sent
  with a `data: ` prefix and terminated with a new line.

## [0.14.1-rc5] - 2024-04-17

- Fix: Code snippets are generated for file upload endpoints using `fs.readStream`. Previously,
  generation for these endpoints was being skipped.

- Fix: If integration tests are not enabled, simple jest tests with a `yarn test`
  script will be created.

- Improvement: In an effort to make the generated code JSR compatible, the generator now
  directly imports from files instead of using directory imports.

- Improvement: In an effort to make the generated code JSR compatible, we make sure all methods
  are strongly typed with return signatures (in this case `_getAuthorizationHeader()`).

- Fix: Generate code snippet for FileDownload endpoint

- Fix: Import for `node-fetch` in `Fetcher.ts` uses a dynamic import instead of `require` which
  so that the SDK works in ESM environments (that are using local file output). When the
  `outputEsm` config flag is turned on, the dynamic import will be turned into an ESM specific import.

- Fix: The test job in `ci.yml` works even if you have not configured Fern to
  generate integration tests.

  Without integration tests the test job will run `yarn && yarn test`. With the
  integration tests, the test job will delegate to the fern cli `fern yarn test`.

- Feature: Add `allowExtraFields` option to permit extra fields in the serialized request.

  ```yaml
  - name: fernapi/fern-typscript-node-sdk
    version: 0.14.0-rc0
    ...
    config:
      allowExtraFields: true
  ```

## [0.13.0] - 2024-04-09

- Support V37 of the IR.

## [0.13.0-rc0] - 2024-04-02

- Feature: Add `retainOriginalCasing` option to preserve the naming convention expressed in the API.
  For example, the following Fern definition will generate a type like so:

```yaml
types:
  GetUsersRequest
    properties:
      group_id: string
```

**Before**

```typescript
export interface GetUsersRequest {
  groupId: string;
}

export interface GetUsersRequest = core.serialization.object({
 groupId: core.serialization.string("group_id")
})

export namespace GetUsersRequest {
  interface Raw {
    group_id: string
  }
}
```

**After**

```typescript
export interface GetUsersRequest {
  group_id: string;
}

export interface GetUsersRequest = core.serialization.object({
 group_id: core.serialization.string()
})

export namespace GetUsersRequest {
  interface Raw {
    group_id: string
  }
}
```

## [0.12.9] - 2024-03-22

- Fix: The generator stopped working for remote code generation starting in `0.12.7`. This is now fixed.

## [0.12.8] - 2024-03-22

- Improvement: Enhance serde performance by reducing reliance on async behavior and lazy async dynamic imports.
- Internal: Shared generator notification and config parsing logic.

## [0.12.8-rc0] - 2024-03-18

- Improvement: Enhance serde performance by reducing reliance on async behavior and lazy async dynamic imports.

## [0.12.7] - 2024-03-14

- Improvement: the SDK will now leverage environment variable defaults, where specified, for authentication variables, such as bearer tokens, api keys, custom headers, etc.

  Previously, the SDK would only leverage these defaults for bearer token auth IF auth was mandatory throughout the SDK.

## [0.12.6] - 2024-02-27

- In Node.js environments the SDK will default to using `node-fetch`. The
  SDK depends on v2 of node-fetch to stay CJS compatible.

  Previously the SDK was doing `require("node-fetch")` but it should be
  `require("node-fetch").default` based on
  https://github.com/node-fetch/node-fetch/issues/450#issuecomment-387045223.

## [0.12.5] - 2024-02-27

- Introduce a custom configuration called `tolerateRepublish` which supports running
  npm publish with the flag `--tolerateRepublish`. This flag allows you to publish
  on top of an existing npm package.

  To turn on this flag, update your generators.yml:

  ```yaml
  groups:
    generators:
      - name: fernapi/fern-typscript-node-sdk
        version: 0.12.5
        ...
        config:
          tolerateRepublish: true
  ```

## [0.12.4] - 2024-02-27

- Fix: Previously reference.md was just leveraging the function name for the reference, now it leverages the full package-scoped path, mirroring how the function would be used in reality.

```ts
seedExamples.getException(...)

// is now

seedExamples.file.notification.service.getException(...)
```

- Fix: Previously SDK code snippets would not support generation with undiscriminated unions. Now, it does.

## [0.12.2] - 2024-02-27

- Fix: Previously SDK code snippets would not take into account default parameter values
  and would always include a `{}`. This was odd and didn't represent how a developer
  would use the SDK. Now, the snippets check for default parameter values and omit
  if there are no fields specified.

  ```ts
  // Before
  client.users.list({});

  // After
  client.users.list();
  ```

## [0.12.1] - 2024-02-27

- Fix: Optional objects in deep query parameters were previously being incorrectly
  serialized. Before this change, optional objects were just being JSON.stringified
  which would send the incorrect contents over the wire.

  ```ts
  // Before
  if (foo != null) {
    _queryParams["foo"] = JSON.stringify(foo);
  }

  // After
  if (foo != null) {
    _queryParams["foo"] = foo;
  }

  // After (with serde layer)
  if (foo != null) {
    _queryParams["foo"] = serializers.Foo.jsonOrThrow(foo, {
      skipValidation: false,
      breadcrumbs: ["request", "foo"]
    });
  }
  ```

## [0.12.0] - 2024-02-26

- Feature: support deep object query parameter serialization. If, query parameters are
  objects then Fern will support serializing them.

  ```yaml
  MyFoo:
    properties:
      bar: optional<string>

  query-parameters:
    foo: MyFoo
  ```

  will now be serialized as `?foo[bar]="...` and appear in the SDK as a regular object

  ```ts
  client.doThing({
    foo: {
      bar: "..."
    }
  });
  ```

## [0.11.5] - 2024-02-15

- Fix: Previously `core.Stream` would not work in the Browser. Now the generated Fern SDK
  includes a polyfill for `ReadableStream` and uses `TextDecoder` instead of `Buffer`.

- Feature: add in a reference markdown file, this shows a quick outline of the available endpoints,
  it's documentation, code snippet, and parameters.

  This feature is currently behind a feature flag called `includeApiReference` and can be used

  ```yaml
  config:
    includeApiReference: true
  ```

## [0.11.4] - 2024-02-15

- Fix: The `Fetcher` now supports sending binary as a request body. This is important
  for APIs that intake `application/octet-stream` content types or for folks that have
  .fernignored their and added custom utilities that leverage the fetcher.

## [0.11.3] - 2024-02-13

- Fix: ensure SDK generator always uses `node-fetch` in Node.js environments. There is an experimental
  fetch packaged with newer versions of Node.js, however it causes unexpected behavior with
  file uploads.

## [0.11.2] - 2024-02-13

- Fix: ensure SDK generator does not drop additional parameters from requests that perform file upload. Previously, if an endpoint had `file` inputs without additional `body` parameters, query parameters were eroniously ignored.

## [0.11.1] - 2024-02-13

- Fix: The SDK generator no longer generates a `tsconfig.json` with `noUnusedParameters`
  enabled. This check was too strict.

## [0.11.0] - 2024-02-13

- Feature: The SDK generator now forwards information about the runtime that it is being
  used in. The header `X-Fern-Runtime` will report the runtime (e.g. `browser`, `node`, `deno`)
  and the header `X-Fern-Runtime-Version` will report the version.

## [0.10.0] - 2024-02-11

- Feature: The SDK generator now supports whitelabelling. When this is turned on,
  there will be no mention of Fern in the generated code.

  **Note**: You must be on the enterprise tier to enable this mode.

## [0.9.7] - 2024-02-11

- Chore: Intialize this changelog
