# frozen_string_literal: true

require_relative "commons/types/VariableValue"
require "json"

module SeedClient
  module Commons
    class TestCase
      attr_reader :id, :params, :additional_properties

      # @param id [String]
      # @param params [Array<Commons::VariableValue>]
      # @param additional_properties [OpenStruct] Additional properties unmapped to the current class definition
      # @return [Commons::TestCase]
      def initialze(id:, params:, additional_properties: nil)
        # @type [String]
        @id = id
        # @type [Array<Commons::VariableValue>]
        @params = params
        # @type [OpenStruct]
        @additional_properties = additional_properties
      end

      # Deserialize a JSON object to an instance of TestCase
      #
      # @param json_object [JSON]
      # @return [Commons::TestCase]
      def self.from_json(json_object:)
        struct = JSON.parse(json_object, object_class: OpenStruct)
        id = struct.id
        params = struct.params.map do |v|
          Commons::VariableValue.from_json(json_object: v)
        end
        new(id: id, params: params, additional_properties: struct)
      end

      # Serialize an instance of TestCase to a JSON object
      #
      # @return [JSON]
      def to_json(*_args)
        {
          id: @id,
          params: @params
        }.to_json
      end
    end
  end
end