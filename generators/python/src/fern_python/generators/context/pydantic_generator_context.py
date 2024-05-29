from __future__ import annotations

from abc import ABC, abstractmethod
from typing import Callable, List, Optional, Set

import fern.ir.resources as ir_types
from fern.generator_exec.resources import GeneratorConfig

from fern_python.codegen import AST, Filepath
from fern_python.pydantic_codegen.pydantic_field import PydanticField

from ..core_utilities import CoreUtilities


class PydanticGeneratorContext(ABC):
    def __init__(
        self,
        *,
        ir: ir_types.IntermediateRepresentation,
        generator_config: GeneratorConfig,
        allow_skipping_validation: bool,
    ):
        self.ir = ir
        self.generator_config = generator_config
        self.core_utilities = CoreUtilities(allow_skipping_validation=allow_skipping_validation)

    @abstractmethod
    def get_module_path_in_project(self, module_path: AST.ModulePath) -> AST.ModulePath:
        ...

    @abstractmethod
    def get_type_hint_for_type_reference(
        self,
        type_reference: ir_types.TypeReference,
        must_import_after_current_declaration: Optional[Callable[[ir_types.DeclaredTypeName], bool]] = None,
        in_endpoint: Optional[bool] = False,
    ) -> AST.TypeHint:
        ...

    @abstractmethod
    def get_class_reference_for_type_id(
        self,
        type_id: ir_types.TypeId,
        must_import_after_current_declaration: Optional[Callable[[ir_types.DeclaredTypeName], bool]] = None,
    ) -> AST.ClassReference:
        ...

    @abstractmethod
    def does_circularly_reference_itself(self, type_id: ir_types.TypeId) -> bool:
        ...

    @abstractmethod
    def do_types_reference_each_other(self, a: ir_types.TypeId, b: ir_types.TypeId) -> bool:
        ...

    @abstractmethod
    def does_type_reference_other_type(self, type_id: ir_types.TypeId, other_type_id: ir_types.TypeId) -> bool:
        ...

    @abstractmethod
    def get_referenced_types(self, type_id: ir_types.TypeId) -> Set[ir_types.TypeId]:
        ...

    @abstractmethod
    def get_class_name_for_type_id(self, type_id: ir_types.TypeId) -> str:
        ...

    @abstractmethod
    def get_declaration_for_type_id(self, type_id: ir_types.TypeId) -> ir_types.TypeDeclaration:
        ...

    @abstractmethod
    def get_referenced_types_of_type_declaration(
        self, type_declaration: ir_types.TypeDeclaration
    ) -> Set[ir_types.TypeId]:
        ...

    @abstractmethod
    def get_referenced_types_of_type_reference(self, type_reference: ir_types.TypeReference) -> Set[ir_types.TypeId]:
        ...

    @abstractmethod
    def get_type_names_in_type_reference(self, type_reference: ir_types.TypeReference) -> Set[ir_types.TypeId]:
        ...

    @abstractmethod
    def get_filepath_for_type_id(self, type_id: ir_types.TypeId) -> Filepath:
        ...

    @abstractmethod
    def get_all_properties_including_extensions(self, type_id: ir_types.TypeId) -> List[ir_types.ObjectProperty]:
        ...

    # Returns the defaulted discriminant fields for the object if the same field is not used
    # in multiple union discriminant fields.
    @abstractmethod
    def get_union_discriminant_fields(self, type_id: ir_types.TypeId, should_reuse_union_members: bool) -> List[PydanticField]:
        ...
