# This file was auto-generated by Fern from our API Definition.

import datetime as dt
import typing

from ......core.datetime_utils import serialize_datetime
from .....commons.types.language import Language
from .....problem.types.problem_description import ProblemDescription
from .custom_files import CustomFiles
from .test_case_template import TestCaseTemplate
from .test_case_v_2 import TestCaseV2

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore


class CreateProblemRequestV2(pydantic.BaseModel):
    problem_name: str = pydantic.Field(alias="problemName")
    problem_description: ProblemDescription = pydantic.Field(alias="problemDescription")
    custom_files: CustomFiles = pydantic.Field(alias="customFiles")
    custom_test_case_templates: typing.List[TestCaseTemplate] = pydantic.Field(alias="customTestCaseTemplates")
    testcases: typing.List[TestCaseV2]
    supported_languages: typing.List[Language] = pydantic.Field(alias="supportedLanguages")
    is_public: bool = pydantic.Field(alias="isPublic")

    def json(self, **kwargs: typing.Any) -> str:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().json(**kwargs_with_defaults)

    def dict(self, **kwargs: typing.Any) -> typing.Dict[str, typing.Any]:
        kwargs_with_defaults: typing.Any = {"by_alias": True, "exclude_unset": True, **kwargs}
        return super().dict(**kwargs_with_defaults)

    class Config:
        frozen = True
        smart_union = True
        allow_population_by_field_name = True
        json_encoders = {dt.datetime: serialize_datetime}
