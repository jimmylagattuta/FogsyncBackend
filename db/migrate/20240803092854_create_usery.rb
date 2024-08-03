class CreateUsery < ActiveRecord::Migration[7.0]
  def change
    create_table :useries do |t|

      t.timestamps
    end
  end
end
