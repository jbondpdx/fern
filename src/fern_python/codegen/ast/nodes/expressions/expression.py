from __future__ import annotations

from enum import Enum
from typing import Optional, Set, Union

from ...ast_node import AstNode, GenericTypeVar, NodeWriter, ReferenceResolver
from ...references import Reference
from ..code_writer import CodeWriter
from .class_instantiation import ClassInstantiation
from .function_invocation import FunctionInvocation


class Expression(AstNode):
    def __init__(
        self,
        expression: Union[FunctionInvocation, CodeWriter, ClassInstantiation, Reference, str],
        spread: Optional[ExpressionSpread] = None,
    ):
        self.expression = CodeWriter(expression) if isinstance(expression, str) else expression
        self.spread = spread

    def get_references(self) -> Set[Reference]:
        if isinstance(self.expression, Reference):
            return set([self.expression])
        return self.expression.get_references()

    def get_generics(self) -> Set[GenericTypeVar]:
        if isinstance(self.expression, Reference):
            return set()
        return self.expression.get_generics()

    def write(self, writer: NodeWriter, reference_resolver: ReferenceResolver) -> None:
        if self.spread is not None:
            writer.write(self.spread.value)
        if isinstance(self.expression, Reference):
            writer.write(reference_resolver.resolve_reference(self.expression))
        else:
            self.expression.write(writer=writer, reference_resolver=reference_resolver)


class ExpressionSpread(Enum):
    ONE_ASTERISK = "*"
    TWO_ASTERISKS = "**"
