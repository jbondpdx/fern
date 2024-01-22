# frozen_string_literal: true

require_relative "submission/types/Scope"
require "json"

module SeedClient
  module Submission
    class StackFrame
      attr_reader :method_name, :line_number, :scopes, :additional_properties

      # @param method_name [String]
      # @param line_number [Integer]
      # @param scopes [Array<Submission::Scope>]
      # @param additional_properties [OpenStruct] Additional properties unmapped to the current class definition
      # @return [Submission::StackFrame]
      def initialze(method_name:, line_number:, scopes:, additional_properties: nil)
        # @type [String]
        @method_name = method_name
        # @type [Integer]
        @line_number = line_number
        # @type [Array<Submission::Scope>]
        @scopes = scopes
        # @type [OpenStruct]
        @additional_properties = additional_properties
      end

      # Deserialize a JSON object to an instance of StackFrame
      #
      # @param json_object [JSON]
      # @return [Submission::StackFrame]
      def self.from_json(json_object:)
        struct = JSON.parse(json_object, object_class: OpenStruct)
        method_name = struct.methodName
        line_number = struct.lineNumber
        scopes = struct.scopes.map do |v|
          Submission::Scope.from_json(json_object: v)
        end
        new(method_name: method_name, line_number: line_number, scopes: scopes, additional_properties: struct)
      end

      # Serialize an instance of StackFrame to a JSON object
      #
      # @return [JSON]
      def to_json(*_args)
        {
          methodName: @method_name,
          lineNumber: @line_number,
          scopes: @scopes
        }.to_json
      end
    end
  end
end