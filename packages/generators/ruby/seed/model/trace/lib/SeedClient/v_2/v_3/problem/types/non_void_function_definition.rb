# frozen_string_literal: true

require_relative "v_2/v_3/problem/types/NonVoidFunctionSignature"
require_relative "v_2/v_3/problem/types/FunctionImplementationForMultipleLanguages"
require "json"

module SeedClient
  module V2
    module V3
      module Problem
        class NonVoidFunctionDefinition
          attr_reader :signature, :code, :additional_properties

          # @param signature [V2::V3::Problem::NonVoidFunctionSignature]
          # @param code [V2::V3::Problem::FunctionImplementationForMultipleLanguages]
          # @param additional_properties [OpenStruct] Additional properties unmapped to the current class definition
          # @return [V2::V3::Problem::NonVoidFunctionDefinition]
          def initialze(signature:, code:, additional_properties: nil)
            # @type [V2::V3::Problem::NonVoidFunctionSignature]
            @signature = signature
            # @type [V2::V3::Problem::FunctionImplementationForMultipleLanguages]
            @code = code
            # @type [OpenStruct]
            @additional_properties = additional_properties
          end

          # Deserialize a JSON object to an instance of NonVoidFunctionDefinition
          #
          # @param json_object [JSON]
          # @return [V2::V3::Problem::NonVoidFunctionDefinition]
          def self.from_json(json_object:)
            struct = JSON.parse(json_object, object_class: OpenStruct)
            signature = V2::V3::Problem::NonVoidFunctionSignature.from_json(json_object: struct.signature)
            code = V2::V3::Problem::FunctionImplementationForMultipleLanguages.from_json(json_object: struct.code)
            new(signature: signature, code: code, additional_properties: struct)
          end

          # Serialize an instance of NonVoidFunctionDefinition to a JSON object
          #
          # @return [JSON]
          def to_json(*_args)
            {
              signature: @signature,
              code: @code
            }.to_json
          end
        end
      end
    end
  end
end