# This file was auto-generated by Fern from our API Definition.

import typing
import urllib.parse
from json.decoder import JSONDecodeError

from ..commons.problem_id import ProblemId
from ..commons.variable_type import VariableType
from ..core.api_error import ApiError
from ..core.client_wrapper import AsyncClientWrapper, SyncClientWrapper
from ..core.jsonable_encoder import jsonable_encoder
from .create_problem_request import CreateProblemRequest
from .create_problem_response import CreateProblemResponse
from .get_default_starter_files_response import GetDefaultStarterFilesResponse
from .update_problem_response import UpdateProblemResponse
from .variable_type_and_name import VariableTypeAndName

try:
    import pydantic.v1 as pydantic  # type: ignore
except ImportError:
    import pydantic  # type: ignore

# this is used as the default value for optional parameters
OMIT = typing.cast(typing.Any, ...)


class ProblemClient:
    def __init__(self, *, client_wrapper: SyncClientWrapper):
        self._client_wrapper = client_wrapper

    def create_problem(self, *, request: CreateProblemRequest) -> CreateProblemResponse:
        """
        Creates a problem

        Parameters:
            - request: CreateProblemRequest.
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "problem-crud/create"),
            json=jsonable_encoder(request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(CreateProblemResponse, _response_json)  # type: ignore
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def update_problem(self, problem_id: ProblemId, *, request: CreateProblemRequest) -> UpdateProblemResponse:
        """
        Updates a problem

        Parameters:
            - problem_id: ProblemId.

            - request: CreateProblemRequest.
        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"problem-crud/update/{problem_id}"),
            json=jsonable_encoder(request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(UpdateProblemResponse, _response_json)  # type: ignore
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def delete_problem(self, problem_id: ProblemId) -> None:
        """
        Soft deletes a problem

        Parameters:
            - problem_id: ProblemId.
        """
        _response = self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"problem-crud/delete/{problem_id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    def get_default_starter_files(
        self, *, input_params: typing.List[VariableTypeAndName], output_type: VariableType, method_name: str
    ) -> GetDefaultStarterFilesResponse:
        """
        Returns default starter files for problem

        Parameters:
            - input_params: typing.List[VariableTypeAndName].

            - output_type: VariableType.

            - method_name: str. The name of the `method` that the student has to complete.
                                The method name cannot include the following characters:
                                  - Greater Than `>`
                                  - Less Than `<``
                                  - Equals `=`
                                  - Period `.`

        """
        _response = self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "problem-crud/default-starter-files"),
            json=jsonable_encoder({"inputParams": input_params, "outputType": output_type, "methodName": method_name}),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(GetDefaultStarterFilesResponse, _response_json)  # type: ignore
        raise ApiError(status_code=_response.status_code, body=_response_json)


class AsyncProblemClient:
    def __init__(self, *, client_wrapper: AsyncClientWrapper):
        self._client_wrapper = client_wrapper

    async def create_problem(self, *, request: CreateProblemRequest) -> CreateProblemResponse:
        """
        Creates a problem

        Parameters:
            - request: CreateProblemRequest.
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "problem-crud/create"),
            json=jsonable_encoder(request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(CreateProblemResponse, _response_json)  # type: ignore
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def update_problem(self, problem_id: ProblemId, *, request: CreateProblemRequest) -> UpdateProblemResponse:
        """
        Updates a problem

        Parameters:
            - problem_id: ProblemId.

            - request: CreateProblemRequest.
        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"problem-crud/update/{problem_id}"),
            json=jsonable_encoder(request),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(UpdateProblemResponse, _response_json)  # type: ignore
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def delete_problem(self, problem_id: ProblemId) -> None:
        """
        Soft deletes a problem

        Parameters:
            - problem_id: ProblemId.
        """
        _response = await self._client_wrapper.httpx_client.request(
            "DELETE",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", f"problem-crud/delete/{problem_id}"),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        if 200 <= _response.status_code < 300:
            return
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        raise ApiError(status_code=_response.status_code, body=_response_json)

    async def get_default_starter_files(
        self, *, input_params: typing.List[VariableTypeAndName], output_type: VariableType, method_name: str
    ) -> GetDefaultStarterFilesResponse:
        """
        Returns default starter files for problem

        Parameters:
            - input_params: typing.List[VariableTypeAndName].

            - output_type: VariableType.

            - method_name: str. The name of the `method` that the student has to complete.
                                The method name cannot include the following characters:
                                  - Greater Than `>`
                                  - Less Than `<``
                                  - Equals `=`
                                  - Period `.`

        """
        _response = await self._client_wrapper.httpx_client.request(
            "POST",
            urllib.parse.urljoin(f"{self._client_wrapper.get_base_url()}/", "problem-crud/default-starter-files"),
            json=jsonable_encoder({"inputParams": input_params, "outputType": output_type, "methodName": method_name}),
            headers=self._client_wrapper.get_headers(),
            timeout=60,
        )
        try:
            _response_json = _response.json()
        except JSONDecodeError:
            raise ApiError(status_code=_response.status_code, body=_response.text)
        if 200 <= _response.status_code < 300:
            return pydantic.parse_obj_as(GetDefaultStarterFilesResponse, _response_json)  # type: ignore
        raise ApiError(status_code=_response.status_code, body=_response_json)