class CreateKeywords < ActiveRecord::Migration[7.2]
  def change
    create_table :keywords do |t|
      t.references :csv_upload, null: false, foreign_key: true
      t.string :term
      t.string :status
      t.text :error_message

      t.timestamps
    end
  end
end
