class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.string :name, null: false, comment: 'ファイル名称'

      t.timestamps
    end
    add_index :invoices, [:name], unique: true
  end
end
