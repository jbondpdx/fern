import { loadDependenciesConfiguration } from "@fern-api/dependencies-configuration";
import { AbsoluteFilePath, join } from "@fern-api/fs-utils";
import { loadGeneratorsConfiguration } from "@fern-api/generators-configuration";
import { DEFINITION_DIRECTORY } from "@fern-api/project-configuration";
import { TaskContext } from "@fern-api/task-context";
import { listYamlFilesForWorkspace } from "./listYamlFilesForWorkspace";
import { parseYamlFiles } from "./parseYamlFiles";
import { processPackageMarkers } from "./processPackageMarkers";
import { WorkspaceLoader } from "./types/Result";
import { validateStructureOfYamlFiles } from "./validateStructureOfYamlFiles";

export async function loadWorkspace({
    absolutePathToWorkspace,
    context,
    cliVersion,
}: {
    absolutePathToWorkspace: AbsoluteFilePath;
    context: TaskContext;
    cliVersion: string;
}): Promise<WorkspaceLoader.Result> {
    const generatorsConfiguration = await loadGeneratorsConfiguration({ absolutePathToWorkspace, context });
    const dependenciesConfiguration = await loadDependenciesConfiguration({ absolutePathToWorkspace, context });
    const absolutePathToDefinition = join(absolutePathToWorkspace, DEFINITION_DIRECTORY);
    const yamlFiles = await listYamlFilesForWorkspace(absolutePathToDefinition);

    const parseResult = await parseYamlFiles(yamlFiles);
    if (!parseResult.didSucceed) {
        return parseResult;
    }

    const structuralValidationResult = validateStructureOfYamlFiles(parseResult.files);
    if (!structuralValidationResult.didSucceed) {
        return structuralValidationResult;
    }

    const processPackageMarkersResult = await processPackageMarkers({
        dependenciesConfiguration,
        structuralValidationResult,
        context,
        cliVersion,
    });
    if (!processPackageMarkersResult.didSucceed) {
        return processPackageMarkersResult;
    }

    return {
        didSucceed: true,
        workspace: {
            name: structuralValidationResult.rootApiFile.name,
            absolutePathToWorkspace,
            absolutePathToDefinition,
            generatorsConfiguration,
            dependenciesConfiguration,
            rootApiFile: structuralValidationResult.rootApiFile,
            serviceFiles: {
                ...structuralValidationResult.serviceFiles,
                ...processPackageMarkersResult.newServiceFiles,
            },
        },
    };
}
