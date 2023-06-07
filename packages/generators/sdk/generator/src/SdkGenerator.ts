import { AbsoluteFilePath } from "@fern-api/fs-utils";
import { HttpService } from "@fern-fern/ir-model/http";
import { IntermediateRepresentation } from "@fern-fern/ir-model/ir";
import {
    BundledTypescriptProject,
    convertExportedFilePathToFilePath,
    CoreUtilitiesManager,
    DependencyManager,
    ExportedDirectory,
    ExportedFilePath,
    ExportsManager,
    ImportsManager,
    JavaScriptRuntime,
    NpmPackage,
    PackageId,
    SimpleTypescriptProject,
    TypescriptProject,
} from "@fern-typescript/commons";
import { GeneratorContext } from "@fern-typescript/contexts";
import { EndpointErrorUnionGenerator } from "@fern-typescript/endpoint-error-union-generator";
import { EnvironmentsGenerator } from "@fern-typescript/environments-generator";
import { GenericAPISdkErrorGenerator, TimeoutSdkErrorGenerator } from "@fern-typescript/generic-sdk-error-generators";
import { RequestWrapperGenerator } from "@fern-typescript/request-wrapper-generator";
import { ErrorResolver, PackageResolver, TypeResolver } from "@fern-typescript/resolvers";
import { SdkClientClassGenerator } from "@fern-typescript/sdk-client-class-generator";
import { SdkEndpointTypeSchemasGenerator } from "@fern-typescript/sdk-endpoint-type-schemas-generator";
import { SdkErrorGenerator } from "@fern-typescript/sdk-error-generator";
import { SdkErrorSchemaGenerator } from "@fern-typescript/sdk-error-schema-generator";
import { SdkInlinedRequestBodySchemaGenerator } from "@fern-typescript/sdk-inlined-request-schema-generator";
import { TypeGenerator } from "@fern-typescript/type-generator";
import { TypeReferenceExampleGenerator } from "@fern-typescript/type-reference-example-generator";
import { TypeSchemaGenerator } from "@fern-typescript/type-schema-generator";
import { Directory, Project, SourceFile } from "ts-morph";
import { EndpointErrorUnionContextImpl } from "./contexts/endpoint-error-union/EndpointErrorUnionContextImpl";
import { EnvironmentsContextImpl } from "./contexts/environments/EnvironmentsContextImpl";
import { GenericAPISdkErrorContextImpl } from "./contexts/generic-api-sdk-error/GenericAPISdkErrorContextImpl";
import { RequestWrapperContextImpl } from "./contexts/request-wrapper/RequestWrapperContextImpl";
import { SdkClientClassContextImpl } from "./contexts/sdk-client-class/SdkClientClassContextImpl";
import { SdkEndpointTypeSchemasContextImpl } from "./contexts/sdk-endpoint-type-schemas/SdkEndpointTypeSchemasContextImpl";
import { SdkErrorSchemaContextImpl } from "./contexts/sdk-error-schema/SdkErrorSchemaContextImpl";
import { SdkErrorContextImpl } from "./contexts/sdk-error/SdkErrorContextImpl";
import { SdkInlinedRequestBodySchemaContextImpl } from "./contexts/sdk-inlined-request-body-schema/SdkInlinedRequestBodySchemaContextImpl";
import { TimeoutSdkErrorContextImpl } from "./contexts/timeout-sdk-error/TimeoutSdkErrorContextImpl";
import { TypeSchemaContextImpl } from "./contexts/type-schema/TypeSchemaContextImpl";
import { TypeContextImpl } from "./contexts/type/TypeContextImpl";
import { EndpointDeclarationReferencer } from "./declaration-referencers/EndpointDeclarationReferencer";
import { EnvironmentsDeclarationReferencer } from "./declaration-referencers/EnvironmentsDeclarationReferencer";
import { GenericAPISdkErrorDeclarationReferencer } from "./declaration-referencers/GenericAPISdkErrorDeclarationReferencer";
import { RequestWrapperDeclarationReferencer } from "./declaration-referencers/RequestWrapperDeclarationReferencer";
import { SdkClientClassDeclarationReferencer } from "./declaration-referencers/SdkClientClassDeclarationReferencer";
import { SdkErrorDeclarationReferencer } from "./declaration-referencers/SdkErrorDeclarationReferencer";
import { SdkInlinedRequestBodyDeclarationReferencer } from "./declaration-referencers/SdkInlinedRequestBodyDeclarationReferencer";
import { TimeoutSdkErrorDeclarationReferencer } from "./declaration-referencers/TimeoutSdkErrorDeclarationReferencer";
import { TypeDeclarationReferencer } from "./declaration-referencers/TypeDeclarationReferencer";

const FILE_HEADER = `/**
 * This file was auto-generated by Fern from our API Definition.
 */
`;

export declare namespace SdkGenerator {
    export interface Init {
        namespaceExport: string;
        intermediateRepresentation: IntermediateRepresentation;
        context: GeneratorContext;
        npmPackage: NpmPackage | undefined;
        config: Config;
    }

    export interface Config {
        shouldBundle: boolean;
        shouldUseBrandedStringAliases: boolean;
        isPackagePrivate: boolean;
        neverThrowErrors: boolean;
        includeCredentialsOnCrossOriginRequests: boolean;
        outputEsm: boolean;
        allowCustomFetcher: boolean;
        includeUtilsOnUnionMembers: boolean;
        includeOtherInUnionTypes: boolean;
        requireDefaultEnvironment: boolean;
        timeoutInSeconds: number | "infinity" | undefined;
        skipResponseValidation: boolean;
        targetRuntime: JavaScriptRuntime;
        extraDependencies: Record<string, string>;
        treatUnknownAsAny: boolean;
        includeContentHeadersOnFileDownloadResponse: boolean;
    }
}

export class SdkGenerator {
    private context: GeneratorContext;
    private intermediateRepresentation: IntermediateRepresentation;
    private config: SdkGenerator.Config;
    private npmPackage: NpmPackage | undefined;

    private project: Project;
    private rootDirectory: Directory;
    private exportsManager: ExportsManager;
    private dependencyManager = new DependencyManager();
    private coreUtilitiesManager: CoreUtilitiesManager;
    private typeResolver: TypeResolver;
    private errorResolver: ErrorResolver;
    private packageResolver: PackageResolver;

    private typeDeclarationReferencer: TypeDeclarationReferencer;
    private typeSchemaDeclarationReferencer: TypeDeclarationReferencer;
    private errorDeclarationReferencer: SdkErrorDeclarationReferencer;
    private sdkErrorSchemaDeclarationReferencer: SdkErrorDeclarationReferencer;
    private sdkClientClassDeclarationReferencer: SdkClientClassDeclarationReferencer;
    private endpointErrorUnionDeclarationReferencer: EndpointDeclarationReferencer;
    private requestWrapperDeclarationReferencer: RequestWrapperDeclarationReferencer;
    private sdkInlinedRequestBodySchemaDeclarationReferencer: SdkInlinedRequestBodyDeclarationReferencer;
    private sdkEndpointSchemaDeclarationReferencer: EndpointDeclarationReferencer;
    private environmentsDeclarationReferencer: EnvironmentsDeclarationReferencer;
    private genericAPISdkErrorDeclarationReferencer: GenericAPISdkErrorDeclarationReferencer;
    private timeoutSdkErrorDeclarationReferencer: TimeoutSdkErrorDeclarationReferencer;

    private typeGenerator: TypeGenerator;
    private typeSchemaGenerator: TypeSchemaGenerator;
    private typeReferenceExampleGenerator: TypeReferenceExampleGenerator;
    private sdkErrorGenerator: SdkErrorGenerator;
    private sdkErrorSchemaGenerator: SdkErrorSchemaGenerator;
    private endpointErrorUnionGenerator: EndpointErrorUnionGenerator;
    private requestWrapperGenerator: RequestWrapperGenerator;
    private sdkInlinedRequestBodySchemaGenerator: SdkInlinedRequestBodySchemaGenerator;
    private sdkEndpointTypeSchemasGenerator: SdkEndpointTypeSchemasGenerator;
    private environmentsGenerator: EnvironmentsGenerator;
    private sdkClientClassGenerator: SdkClientClassGenerator;
    private genericAPISdkErrorGenerator: GenericAPISdkErrorGenerator;
    private timeoutSdkErrorGenerator: TimeoutSdkErrorGenerator;

    constructor({ namespaceExport, intermediateRepresentation, context, npmPackage, config }: SdkGenerator.Init) {
        this.context = context;
        this.intermediateRepresentation = intermediateRepresentation;
        this.config = config;
        this.npmPackage = npmPackage;

        this.exportsManager = new ExportsManager();
        this.coreUtilitiesManager = new CoreUtilitiesManager();

        this.project = new Project({
            useInMemoryFileSystem: true,
        });
        this.rootDirectory = this.project.createDirectory("/");
        this.typeResolver = new TypeResolver(intermediateRepresentation);
        this.errorResolver = new ErrorResolver(intermediateRepresentation);
        this.packageResolver = new PackageResolver(intermediateRepresentation);

        const apiDirectory: ExportedDirectory[] = [
            {
                nameOnDisk: "api",
                exportDeclaration: { namespaceExport },
            },
        ];

        const schemaDirectory: ExportedDirectory[] = [
            {
                nameOnDisk: "serialization",
            },
        ];

        this.typeDeclarationReferencer = new TypeDeclarationReferencer({
            containingDirectory: apiDirectory,
            namespaceExport,
        });
        this.typeSchemaDeclarationReferencer = new TypeDeclarationReferencer({
            containingDirectory: schemaDirectory,
            namespaceExport,
        });
        this.errorDeclarationReferencer = new SdkErrorDeclarationReferencer({
            containingDirectory: apiDirectory,
            namespaceExport,
        });
        this.sdkErrorSchemaDeclarationReferencer = new SdkErrorDeclarationReferencer({
            containingDirectory: schemaDirectory,
            namespaceExport,
        });
        this.sdkClientClassDeclarationReferencer = new SdkClientClassDeclarationReferencer({
            containingDirectory: apiDirectory,
            namespaceExport,
            packageResolver: this.packageResolver,
        });
        this.endpointErrorUnionDeclarationReferencer = new EndpointDeclarationReferencer({
            containingDirectory: apiDirectory,
            namespaceExport,
            packageResolver: this.packageResolver,
        });
        this.requestWrapperDeclarationReferencer = new RequestWrapperDeclarationReferencer({
            containingDirectory: apiDirectory,
            namespaceExport,
            packageResolver: this.packageResolver,
        });
        this.sdkInlinedRequestBodySchemaDeclarationReferencer = new SdkInlinedRequestBodyDeclarationReferencer({
            containingDirectory: schemaDirectory,
            namespaceExport,
            packageResolver: this.packageResolver,
        });
        this.sdkEndpointSchemaDeclarationReferencer = new EndpointDeclarationReferencer({
            containingDirectory: schemaDirectory,
            namespaceExport,
            packageResolver: this.packageResolver,
        });
        this.environmentsDeclarationReferencer = new EnvironmentsDeclarationReferencer({
            containingDirectory: [],
            namespaceExport,
            environmentsConfig: intermediateRepresentation.environments ?? undefined,
        });
        this.genericAPISdkErrorDeclarationReferencer = new GenericAPISdkErrorDeclarationReferencer({
            containingDirectory: [],
            namespaceExport,
        });
        this.timeoutSdkErrorDeclarationReferencer = new TimeoutSdkErrorDeclarationReferencer({
            containingDirectory: [],
            namespaceExport,
        });

        this.typeGenerator = new TypeGenerator({
            useBrandedStringAliases: config.shouldUseBrandedStringAliases,
            includeUtilsOnUnionMembers: config.includeUtilsOnUnionMembers,
            includeOtherInUnionTypes: config.includeOtherInUnionTypes,
        });
        this.typeSchemaGenerator = new TypeSchemaGenerator({
            includeUtilsOnUnionMembers: config.includeUtilsOnUnionMembers,
        });
        this.typeReferenceExampleGenerator = new TypeReferenceExampleGenerator();
        this.sdkErrorGenerator = new SdkErrorGenerator({
            neverThrowErrors: config.neverThrowErrors,
        });
        this.sdkErrorSchemaGenerator = new SdkErrorSchemaGenerator({
            skipValidation: config.skipResponseValidation,
        });
        this.endpointErrorUnionGenerator = new EndpointErrorUnionGenerator({
            errorResolver: this.errorResolver,
            intermediateRepresentation,
        });
        this.sdkEndpointTypeSchemasGenerator = new SdkEndpointTypeSchemasGenerator({
            errorResolver: this.errorResolver,
            intermediateRepresentation,
            shouldGenerateErrors: config.neverThrowErrors,
            skipResponseValidation: config.skipResponseValidation,
        });
        this.requestWrapperGenerator = new RequestWrapperGenerator();
        this.environmentsGenerator = new EnvironmentsGenerator();
        this.sdkClientClassGenerator = new SdkClientClassGenerator({
            intermediateRepresentation,
            errorResolver: this.errorResolver,
            packageResolver: this.packageResolver,
            neverThrowErrors: config.neverThrowErrors,
            includeCredentialsOnCrossOriginRequests: config.includeCredentialsOnCrossOriginRequests,
            allowCustomFetcher: config.allowCustomFetcher,
            requireDefaultEnvironment: config.requireDefaultEnvironment,
            timeoutInSeconds: config.timeoutInSeconds,
            npmPackage,
            targetRuntime: config.targetRuntime,
            includeContentHeadersOnFileDownloadResponse: config.includeContentHeadersOnFileDownloadResponse,
        });
        this.genericAPISdkErrorGenerator = new GenericAPISdkErrorGenerator();
        this.timeoutSdkErrorGenerator = new TimeoutSdkErrorGenerator();
        this.sdkInlinedRequestBodySchemaGenerator = new SdkInlinedRequestBodySchemaGenerator();
    }

    public async generate(): Promise<TypescriptProject> {
        this.generateTypeDeclarations();
        this.generateTypeSchemas();
        this.generateErrorDeclarations();
        this.generateServiceDeclarations();
        this.generateEnvironments();
        this.generateRequestWrappers();
        this.generateEndpointTypeSchemas();
        this.generateInlinedRequestBodySchemas();

        if (this.config.neverThrowErrors) {
            this.generateEndpointErrorUnion();
        } else {
            this.generateGenericAPISdkError();
            this.generateTimeoutSdkError();
            this.generateSdkErrorSchemas();
        }

        this.coreUtilitiesManager.finalize(this.exportsManager, this.dependencyManager);
        this.exportsManager.writeExportsToProject(this.rootDirectory);

        return this.config.shouldBundle
            ? new BundledTypescriptProject({
                  npmPackage: this.npmPackage,
                  dependencies: this.dependencyManager.getDependencies(),
                  tsMorphProject: this.project,
                  extraDependencies: this.config.extraDependencies,
              })
            : new SimpleTypescriptProject({
                  npmPackage: this.npmPackage,
                  dependencies: this.dependencyManager.getDependencies(),
                  tsMorphProject: this.project,
                  outputEsm: this.config.outputEsm,
                  extraDependencies: this.config.extraDependencies,
              });
    }

    public async copyCoreUtilities({ pathToSrc }: { pathToSrc: AbsoluteFilePath }): Promise<void> {
        await this.coreUtilitiesManager.copyCoreUtilities({ pathToSrc });
    }

    private generateTypeDeclarations() {
        for (const typeDeclaration of Object.values(this.intermediateRepresentation.types)) {
            this.withSourceFile({
                filepath: this.typeDeclarationReferencer.getExportedFilepath(typeDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const typeContext = new TypeContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constants,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeGenerator: this.typeGenerator,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        treatUnknownAsAny: this.config.treatUnknownAsAny,
                    });
                    typeContext.type.getGeneratedType(typeDeclaration.name).writeToFile(typeContext);
                },
            });
        }
    }

    private generateTypeSchemas() {
        for (const typeDeclaration of Object.values(this.intermediateRepresentation.types)) {
            this.withSourceFile({
                filepath: this.typeSchemaDeclarationReferencer.getExportedFilepath(typeDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const typeSchemaContext = new TypeSchemaContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constants,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                        typeGenerator: this.typeGenerator,
                        typeSchemaGenerator: this.typeSchemaGenerator,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        treatUnknownAsAny: this.config.treatUnknownAsAny,
                    });
                    typeSchemaContext.typeSchema
                        .getGeneratedTypeSchema(typeDeclaration.name)
                        .writeToFile(typeSchemaContext);
                },
            });
        }
    }

    private generateErrorDeclarations() {
        for (const errorDeclaration of Object.values(this.intermediateRepresentation.errors)) {
            this.withSourceFile({
                filepath: this.errorDeclarationReferencer.getExportedFilepath(errorDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const errorContext = new SdkErrorContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constants,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeGenerator: this.typeGenerator,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        errorDeclarationReferencer: this.errorDeclarationReferencer,
                        sdkErrorGenerator: this.sdkErrorGenerator,
                        errorResolver: this.errorResolver,
                        genericAPISdkErrorDeclarationReferencer: this.genericAPISdkErrorDeclarationReferencer,
                        genericAPISdkErrorGenerator: this.genericAPISdkErrorGenerator,
                        treatUnknownAsAny: this.config.treatUnknownAsAny,
                    });
                    errorContext.sdkError.getGeneratedSdkError(errorDeclaration.name)?.writeToFile(errorContext);
                },
            });
        }
    }

    private generateSdkErrorSchemas() {
        for (const errorDeclaration of Object.values(this.intermediateRepresentation.errors)) {
            this.withSourceFile({
                filepath: this.sdkErrorSchemaDeclarationReferencer.getExportedFilepath(errorDeclaration.name),
                run: ({ sourceFile, importsManager }) => {
                    const sdkErrorSchemaContext = new SdkErrorSchemaContextImpl({
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constants,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        errorDeclarationReferencer: this.errorDeclarationReferencer,
                        sdkErrorGenerator: this.sdkErrorGenerator,
                        errorResolver: this.errorResolver,
                        typeGenerator: this.typeGenerator,
                        typeSchemaGenerator: this.typeSchemaGenerator,
                        sdkErrorSchemaDeclarationReferencer: this.sdkErrorSchemaDeclarationReferencer,
                        sdkErrorSchemaGenerator: this.sdkErrorSchemaGenerator,
                        genericAPISdkErrorDeclarationReferencer: this.genericAPISdkErrorDeclarationReferencer,
                        genericAPISdkErrorGenerator: this.genericAPISdkErrorGenerator,
                        treatUnknownAsAny: this.config.treatUnknownAsAny,
                    });
                    sdkErrorSchemaContext.sdkErrorSchema
                        .getGeneratedSdkErrorSchema(errorDeclaration.name)
                        ?.writeToFile(sdkErrorSchemaContext);
                },
            });
        }
    }

    private generateEndpointErrorUnion() {
        this.forEachService((service, packageId) => {
            for (const endpoint of service.endpoints) {
                this.withSourceFile({
                    filepath: this.endpointErrorUnionDeclarationReferencer.getExportedFilepath({
                        packageId,
                        endpoint,
                    }),
                    run: ({ sourceFile, importsManager }) => {
                        const endpointErrorUnionContext = new EndpointErrorUnionContextImpl({
                            sourceFile,
                            coreUtilitiesManager: this.coreUtilitiesManager,
                            dependencyManager: this.dependencyManager,
                            fernConstants: this.intermediateRepresentation.constants,
                            importsManager,
                            typeResolver: this.typeResolver,
                            typeDeclarationReferencer: this.typeDeclarationReferencer,
                            typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                            errorDeclarationReferencer: this.errorDeclarationReferencer,
                            endpointErrorUnionDeclarationReferencer: this.endpointErrorUnionDeclarationReferencer,
                            sdkErrorGenerator: this.sdkErrorGenerator,
                            errorResolver: this.errorResolver,
                            packageResolver: this.packageResolver,
                            typeGenerator: this.typeGenerator,
                            endpointErrorUnionGenerator: this.endpointErrorUnionGenerator,
                            treatUnknownAsAny: this.config.treatUnknownAsAny,
                        });
                        endpointErrorUnionContext.endpointErrorUnion
                            .getGeneratedEndpointErrorUnion(packageId, endpoint.name)
                            .writeToFile(endpointErrorUnionContext);
                    },
                });
            }
        });
    }

    private generateEndpointTypeSchemas() {
        this.forEachService((service, packageId) => {
            for (const endpoint of service.endpoints) {
                this.withSourceFile({
                    filepath: this.sdkEndpointSchemaDeclarationReferencer.getExportedFilepath({
                        packageId,
                        endpoint,
                    }),
                    run: ({ sourceFile, importsManager }) => {
                        const endpointTypeSchemasContext = new SdkEndpointTypeSchemasContextImpl({
                            sourceFile,
                            coreUtilitiesManager: this.coreUtilitiesManager,
                            dependencyManager: this.dependencyManager,
                            fernConstants: this.intermediateRepresentation.constants,
                            importsManager,
                            typeResolver: this.typeResolver,
                            typeDeclarationReferencer: this.typeDeclarationReferencer,
                            typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                            typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                            errorDeclarationReferencer: this.errorDeclarationReferencer,
                            sdkEndpointSchemaDeclarationReferencer: this.sdkEndpointSchemaDeclarationReferencer,
                            endpointErrorUnionDeclarationReferencer: this.endpointErrorUnionDeclarationReferencer,
                            endpointErrorUnionGenerator: this.endpointErrorUnionGenerator,
                            requestWrapperDeclarationReferencer: this.requestWrapperDeclarationReferencer,
                            requestWrapperGenerator: this.requestWrapperGenerator,
                            typeGenerator: this.typeGenerator,
                            sdkErrorGenerator: this.sdkErrorGenerator,
                            errorResolver: this.errorResolver,
                            packageResolver: this.packageResolver,
                            sdkEndpointTypeSchemasGenerator: this.sdkEndpointTypeSchemasGenerator,
                            typeSchemaGenerator: this.typeSchemaGenerator,
                            treatUnknownAsAny: this.config.treatUnknownAsAny,
                        });
                        endpointTypeSchemasContext.sdkEndpointTypeSchemas
                            .getGeneratedEndpointTypeSchemas(packageId, endpoint.name)
                            .writeToFile(endpointTypeSchemasContext);
                    },
                });
            }
        });
    }

    private generateRequestWrappers() {
        this.forEachService((service, packageId) => {
            for (const endpoint of service.endpoints) {
                if (endpoint.sdkRequest?.shape.type === "wrapper") {
                    this.withSourceFile({
                        filepath: this.requestWrapperDeclarationReferencer.getExportedFilepath({
                            packageId,
                            endpoint,
                        }),
                        run: ({ sourceFile, importsManager }) => {
                            const context = new RequestWrapperContextImpl({
                                sourceFile,
                                coreUtilitiesManager: this.coreUtilitiesManager,
                                dependencyManager: this.dependencyManager,
                                fernConstants: this.intermediateRepresentation.constants,
                                importsManager,
                                typeResolver: this.typeResolver,
                                typeDeclarationReferencer: this.typeDeclarationReferencer,
                                typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                                typeGenerator: this.typeGenerator,
                                packageResolver: this.packageResolver,
                                requestWrapperDeclarationReferencer: this.requestWrapperDeclarationReferencer,
                                requestWrapperGenerator: this.requestWrapperGenerator,
                                treatUnknownAsAny: this.config.treatUnknownAsAny,
                            });
                            context.requestWrapper
                                .getGeneratedRequestWrapper(packageId, endpoint.name)
                                .writeToFile(context);
                        },
                    });
                }
            }
        });
    }

    private generateInlinedRequestBodySchemas() {
        this.forEachService((service, packageId) => {
            for (const endpoint of service.endpoints) {
                if (endpoint.requestBody?.type === "inlinedRequestBody") {
                    this.withSourceFile({
                        filepath: this.sdkInlinedRequestBodySchemaDeclarationReferencer.getExportedFilepath({
                            packageId,
                            endpoint,
                        }),
                        run: ({ sourceFile, importsManager }) => {
                            const context = new SdkInlinedRequestBodySchemaContextImpl({
                                sourceFile,
                                coreUtilitiesManager: this.coreUtilitiesManager,
                                dependencyManager: this.dependencyManager,
                                fernConstants: this.intermediateRepresentation.constants,
                                importsManager,
                                typeResolver: this.typeResolver,
                                packageResolver: this.packageResolver,
                                typeDeclarationReferencer: this.typeDeclarationReferencer,
                                typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                                typeGenerator: this.typeGenerator,
                                requestWrapperDeclarationReferencer: this.requestWrapperDeclarationReferencer,
                                requestWrapperGenerator: this.requestWrapperGenerator,
                                sdkInlinedRequestBodySchemaGenerator: this.sdkInlinedRequestBodySchemaGenerator,
                                sdkInlinedRequestBodySchemaDeclarationReferencer:
                                    this.sdkInlinedRequestBodySchemaDeclarationReferencer,
                                typeSchemaGenerator: this.typeSchemaGenerator,
                                typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                                treatUnknownAsAny: this.config.treatUnknownAsAny,
                            });
                            context.sdkInlinedRequestBodySchema
                                .getGeneratedInlinedRequestBodySchema(packageId, endpoint.name)
                                .writeToFile(context);
                        },
                    });
                }
            }
        });
    }

    private generateServiceDeclarations() {
        for (const packageId of this.getAllPackageIds()) {
            const package_ = this.packageResolver.resolvePackage(packageId);
            if (!package_.hasEndpointsInTree) {
                continue;
            }
            this.withSourceFile({
                filepath: this.sdkClientClassDeclarationReferencer.getExportedFilepath(packageId),
                run: ({ sourceFile, importsManager }) => {
                    const sdkClientClassContext = new SdkClientClassContextImpl({
                        intermediateRepresentation: this.intermediateRepresentation,
                        sourceFile,
                        coreUtilitiesManager: this.coreUtilitiesManager,
                        dependencyManager: this.dependencyManager,
                        fernConstants: this.intermediateRepresentation.constants,
                        importsManager,
                        typeResolver: this.typeResolver,
                        typeDeclarationReferencer: this.typeDeclarationReferencer,
                        typeSchemaDeclarationReferencer: this.typeSchemaDeclarationReferencer,
                        typeReferenceExampleGenerator: this.typeReferenceExampleGenerator,
                        errorDeclarationReferencer: this.errorDeclarationReferencer,
                        sdkErrorSchemaDeclarationReferencer: this.sdkErrorSchemaDeclarationReferencer,
                        endpointErrorUnionDeclarationReferencer: this.endpointErrorUnionDeclarationReferencer,
                        sdkEndpointSchemaDeclarationReferencer: this.sdkEndpointSchemaDeclarationReferencer,
                        endpointErrorUnionGenerator: this.endpointErrorUnionGenerator,
                        requestWrapperDeclarationReferencer: this.requestWrapperDeclarationReferencer,
                        requestWrapperGenerator: this.requestWrapperGenerator,
                        sdkInlinedRequestBodySchemaDeclarationReferencer:
                            this.sdkInlinedRequestBodySchemaDeclarationReferencer,
                        sdkInlinedRequestBodySchemaGenerator: this.sdkInlinedRequestBodySchemaGenerator,
                        typeGenerator: this.typeGenerator,
                        sdkErrorGenerator: this.sdkErrorGenerator,
                        errorResolver: this.errorResolver,
                        packageResolver: this.packageResolver,
                        sdkEndpointTypeSchemasGenerator: this.sdkEndpointTypeSchemasGenerator,
                        typeSchemaGenerator: this.typeSchemaGenerator,
                        sdkErrorSchemaGenerator: this.sdkErrorSchemaGenerator,
                        environmentsGenerator: this.environmentsGenerator,
                        environmentsDeclarationReferencer: this.environmentsDeclarationReferencer,
                        sdkClientClassDeclarationReferencer: this.sdkClientClassDeclarationReferencer,
                        sdkClientClassGenerator: this.sdkClientClassGenerator,
                        genericAPISdkErrorDeclarationReferencer: this.genericAPISdkErrorDeclarationReferencer,
                        genericAPISdkErrorGenerator: this.genericAPISdkErrorGenerator,
                        timeoutSdkErrorDeclarationReferencer: this.timeoutSdkErrorDeclarationReferencer,
                        timeoutSdkErrorGenerator: this.timeoutSdkErrorGenerator,
                        treatUnknownAsAny: this.config.treatUnknownAsAny,
                    });
                    sdkClientClassContext.sdkClientClass
                        .getGeneratedSdkClientClass(packageId)
                        .writeToFile(sdkClientClassContext);
                },
            });
        }
    }

    private generateEnvironments(): void {
        this.withSourceFile({
            filepath: this.environmentsDeclarationReferencer.getExportedFilepath(),
            run: ({ sourceFile, importsManager }) => {
                const environmentsContext = new EnvironmentsContextImpl({
                    sourceFile,
                    coreUtilitiesManager: this.coreUtilitiesManager,
                    dependencyManager: this.dependencyManager,
                    fernConstants: this.intermediateRepresentation.constants,
                    importsManager,
                    intermediateRepresentation: this.intermediateRepresentation,
                    environmentsGenerator: this.environmentsGenerator,
                    environmentsDeclarationReferencer: this.environmentsDeclarationReferencer,
                    treatUnknownAsAny: this.config.treatUnknownAsAny,
                });
                environmentsContext.environments.getGeneratedEnvironments().writeToFile(environmentsContext);
            },
        });
    }

    private generateGenericAPISdkError(): void {
        this.withSourceFile({
            filepath: this.genericAPISdkErrorDeclarationReferencer.getExportedFilepath(),
            run: ({ sourceFile, importsManager }) => {
                const context = new GenericAPISdkErrorContextImpl({
                    sourceFile,
                    coreUtilitiesManager: this.coreUtilitiesManager,
                    dependencyManager: this.dependencyManager,
                    fernConstants: this.intermediateRepresentation.constants,
                    importsManager,
                    genericAPISdkErrorDeclarationReferencer: this.genericAPISdkErrorDeclarationReferencer,
                    genericAPISdkErrorGenerator: this.genericAPISdkErrorGenerator,
                });
                this.genericAPISdkErrorGenerator
                    .generateGenericAPISdkError({
                        errorClassName: this.genericAPISdkErrorDeclarationReferencer.getExportedName(),
                    })
                    .writeToFile(context);
            },
        });
    }

    private generateTimeoutSdkError(): void {
        this.withSourceFile({
            filepath: this.timeoutSdkErrorDeclarationReferencer.getExportedFilepath(),
            run: ({ sourceFile, importsManager }) => {
                const context = new TimeoutSdkErrorContextImpl({
                    sourceFile,
                    coreUtilitiesManager: this.coreUtilitiesManager,
                    dependencyManager: this.dependencyManager,
                    fernConstants: this.intermediateRepresentation.constants,
                    importsManager,
                    timeoutSdkErrorDeclarationReferencer: this.timeoutSdkErrorDeclarationReferencer,
                    timeoutSdkErrorGenerator: this.timeoutSdkErrorGenerator,
                });
                this.timeoutSdkErrorGenerator
                    .generateTimeoutSdkError({
                        errorClassName: this.timeoutSdkErrorDeclarationReferencer.getExportedName(),
                    })
                    .writeToFile(context);
            },
        });
    }

    private withSourceFile({
        run,
        filepath,
    }: {
        run: (args: { sourceFile: SourceFile; importsManager: ImportsManager }) => void;
        filepath: ExportedFilePath;
    }) {
        const filepathStr = convertExportedFilePathToFilePath(filepath);
        this.context.logger.debug(`Generating ${filepathStr}`);

        const sourceFile = this.rootDirectory.createSourceFile(filepathStr);
        const importsManager = new ImportsManager();

        run({ sourceFile, importsManager });

        if (sourceFile.getStatements().length === 0) {
            sourceFile.delete();
            this.context.logger.debug(`Skipping ${filepathStr} (no content)`);
        } else {
            importsManager.writeImportsToSourceFile(sourceFile);
            this.exportsManager.addExportsForFilepath(filepath);

            // this needs to be last.
            // https://github.com/dsherret/ts-morph/issues/189#issuecomment-414174283
            sourceFile.insertText(0, (writer) => {
                writer.writeLine(FILE_HEADER);
            });

            this.context.logger.debug(`Generated ${filepathStr}`);
        }
    }

    private getAllPackageIds(): PackageId[] {
        return [
            { isRoot: true },
            ...Object.keys(this.intermediateRepresentation.subpackages).map(
                (subpackageId): PackageId => ({ isRoot: false, subpackageId })
            ),
        ];
    }

    private forEachService(run: (service: HttpService, packageId: PackageId) => void): void {
        for (const packageId of this.getAllPackageIds()) {
            const service = this.packageResolver.getServiceDeclaration(packageId);
            if (service != null) {
                run(service, packageId);
            }
        }
    }
}
