# This file was auto-generated by Fern from our API Definition.

import glob
import importlib
import os
import types
import typing

import fastapi
import starlette
from fastapi import params

from .admin.service.service import AbstractAdminService
from .core.abstract_fern_service import AbstractFernService
from .core.exceptions import default_exception_handler, fern_http_exception_handler, http_exception_handler
from .core.exceptions.fern_http_exception import FernHTTPException
from .homepage.service.service import AbstractHomepageService
from .migration.service.service import AbstractMigrationService
from .playlist.service.service import AbstractPlaylistService
from .problem.service.service import AbstractProblemService
from .submission.service.service import AbstractSubmissionService
from .sysprop.service.service import AbstractSyspropService
from .v_2.problem.service.service import AbstractV2ProblemService
from .v_2.service.service import AbstractV2Service
from .v_2.v_3.problem.service.service import AbstractV2V3ProblemService


def register(
    _app: fastapi.FastAPI,
    *,
    v_2: AbstractV2Service,
    admin: AbstractAdminService,
    homepage: AbstractHomepageService,
    migration: AbstractMigrationService,
    playlist: AbstractPlaylistService,
    problem: AbstractProblemService,
    submission: AbstractSubmissionService,
    sysprop: AbstractSyspropService,
    v_2_problem: AbstractV2ProblemService,
    v_2_v_3_problem: AbstractV2V3ProblemService,
    dependencies: typing.Optional[typing.Sequence[params.Depends]] = None
) -> None:
    _app.include_router(__register_service(v_2), dependencies=dependencies)
    _app.include_router(__register_service(admin), dependencies=dependencies)
    _app.include_router(__register_service(homepage), dependencies=dependencies)
    _app.include_router(__register_service(migration), dependencies=dependencies)
    _app.include_router(__register_service(playlist), dependencies=dependencies)
    _app.include_router(__register_service(problem), dependencies=dependencies)
    _app.include_router(__register_service(submission), dependencies=dependencies)
    _app.include_router(__register_service(sysprop), dependencies=dependencies)
    _app.include_router(__register_service(v_2_problem), dependencies=dependencies)
    _app.include_router(__register_service(v_2_v_3_problem), dependencies=dependencies)

    _app.add_exception_handler(FernHTTPException, fern_http_exception_handler)
    _app.add_exception_handler(starlette.exceptions.HTTPException, http_exception_handler)
    _app.add_exception_handler(Exception, default_exception_handler)


def __register_service(service: AbstractFernService) -> fastapi.APIRouter:
    router = fastapi.APIRouter()
    type(service)._init_fern(router)
    return router


def register_validators(module: types.ModuleType) -> None:
    validators_directory: str = os.path.dirname(module.__file__)  # type: ignore
    for path in glob.glob(os.path.join(validators_directory, "**/*.py"), recursive=True):
        if os.path.isfile(path):
            relative_path = os.path.relpath(path, start=validators_directory)
            module_path = ".".join([module.__name__] + relative_path[:-3].split("/"))
            importlib.import_module(module_path)