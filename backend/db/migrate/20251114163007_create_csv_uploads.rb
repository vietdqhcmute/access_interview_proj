class CreateCsvUploads < ActiveRecord::Migration[7.2]
  def change
    create_table :csv_uploads do |t|
      t.references :user, null: false, foreign_key: true
      t.string :filename
      t.integer :total_keyword
      t.integer :processed_keywords
      t.string :status

      t.timestamps
    end
  end
end
