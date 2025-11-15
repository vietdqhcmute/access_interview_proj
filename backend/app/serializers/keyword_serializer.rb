class KeywordSerializer < ActiveModel::Serializer
  attributes :id, :term, :status, :error_message, :created_at, :updated_at
end
