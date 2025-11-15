class CreateSearchResults < ActiveRecord::Migration[7.2]
  def change
    create_table :search_results do |t|
      t.references :keyword, null: false, foreign_key: true
      t.integer :total_results
      t.integer :results_with_thumbnails
      t.integer :results_without_thumbnails
      t.integer :total_links
      t.text :html_content

      t.timestamps
    end
  end
end
