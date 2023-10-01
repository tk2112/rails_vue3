class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :control_no, null: false, comment: '管理番号', limit: 8
      t.string :machine_code, comment: '機種コード', limit: 50
      t.string :machine_name, comment: '機種名称', limit: 40
      t.string :order_status, comment: '受注ステータス', limit: 50
      t.string :order_no, comment: '受注番号', limit: 30
      t.integer :order_detail_no, comment: '受注明細番号'
      t.string :product_no, comment: '製品仕様番号', limit: 12
      t.string :composition_no, comment: '受注構成番号', limit: 10
      t.string :control_no_labels, comment: '管理番号表記', limit: 20
      t.integer :amount_labels, comment: '台数'
      t.integer :unit_price, comment: '売上単価'
      t.date :order_date, comment: '受注日', default: '0000-00-00'
      t.string :preferred_delivery_date_header, comment: '希望納期_受注ヘッダー', default: '0000-00-00'
      t.string :preferred_delivery_date, comment: '希望納期_受注詳細'
      t.date :delivery_date_order, comment: '受注_出荷日', default: '0000-00-00'
      t.string :manager_purcahse_order, comment: '発注担当者名'
      t.string :delivery_name, comment: '納品先名称', limit: 120
      t.string :delivery_post, comment: '納品先郵便番号', limit: 8
      t.string :delivery_address, comment: '納品先住所', limit: 200
      t.string :delivery_tel, comment: '納品先電話番号', limit: 20
      t.string :delivery_fax, comment: '納品先FAX番号', limit: 20
      t.string :delivery_manager, comment: '納品先担当者名'
      t.string :customer_name, comment: '得意先名称', limit: 120
      t.string :customer_post, comment: '得意先郵便番号', limit: 8
      t.string :customer_address, comment: '得意先住所', limit: 200
      t.string :customer_tel, comment: '得意先電話番号', limit: 20
      t.string :customer_fax, comment: '得意先FAX番号', limit: 20
      t.string :customer_manager, comment: '得意先担当者名', limit: 40
      t.string :assembly_location_code, comment: '組立場所倉庫コード', limit: 9
      t.string :assembly_location_name, comment: '組立場所倉庫名称', limit: 40
      t.string :arch_width, comment: 'アーチ幅', limit: 150
      t.string :arch_height, comment: 'アーチ高', limit: 150
      t.string :band_size, comment: 'バンドサイズ', limit: 150
      t.string :frequency, comment: '周波数', limit: 150
      t.string :voltage, comment: '電圧', limit: 150
      t.string :other_spec_01, comment: '項目1', limit: 150
      t.string :other_spec_02, comment: '項目2', limit: 150
      t.string :other_spec_03, comment: '項目3', limit: 150
      t.string :other_spec_04, comment: '項目4', limit: 150
      t.string :other_spec_05, comment: '項目5', limit: 150
      t.string :other_spec_06, comment: '項目6', limit: 150
      t.string :other_spec_07, comment: '項目7', limit: 150
      t.string :other_spec_08, comment: '項目8', limit: 150
      t.string :other_spec_09, comment: '項目9', limit: 150
      t.string :other_spec_10, comment: '項目10', limit: 150
      t.string :other_spec_11, comment: '項目11', limit: 150
      t.string :other_spec_12, comment: '項目12', limit: 150
      t.string :other_spec_13, comment: '項目13', limit: 150
      t.string :other_spec_14, comment: '項目14', limit: 150
      t.string :other_spec_15, comment: '項目15', limit: 150
      t.string :other_spec_16, comment: '項目16', limit: 150
      t.string :other_spec_17, comment: '項目17', limit: 150
      t.string :other_spec_18, comment: '項目18', limit: 150
      t.string :other_spec_19, comment: '項目19', limit: 150
      t.string :other_spec_20, comment: '項目20', limit: 150
      t.string :other_spec_21, comment: '項目21', limit: 150
      t.string :other_spec_22, comment: '項目22', limit: 150
      t.string :other_spec_23, comment: '項目23', limit: 150
      t.string :other_spec_24, comment: '項目24', limit: 150
      t.string :color, comment: '塗装色', limit: 150
      t.string :power_consumption, comment: '定格消費電力(Kva)', limit: 10
      t.string :breaking_capacity, comment: '短絡遮断容量/SCCR', limit: 10
      t.string :full_load_current, comment: '全負荷電流/FLC', limit: 10
      t.string :sequence_no, comment: 'シーケンス番号', limit: 30
      t.text :note_product_common, comment: '製品仕様_共通備考'
      t.text :note_product_special_spec, comment: '特注仕様'
      t.text :note_product_inner, comment: '製品仕様_内部連絡事項'
      t.text :note_order_detail, comment: '受注詳細摘要'
      t.text :note_order_common, comment: '受注_備考_共通'
      t.text :note_order_only_base, comment: '受注_備考_拠点内'
      t.text :note_order_shipment, comment: '受注_運送情報_送り状印字'
      t.string :shipment_company, comment: '運送会社', limit: 120
      t.string :shipment_no, comment: '運送伝票', limit: 50
      t.float :planed_man_hours, comment: '予定工数'
      t.date :planed_date_draw_machine, comment: '出図予定日_機械', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_draw_electric, comment: '出図予定日_電気', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_buy, comment: '部品入荷予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_supply, comment: '部品支給予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_assemble_start, comment: '組立開始予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_assemble_end, comment: '組立完了予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_exam, comment: '出荷検査予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_soft, comment: 'ソフト調整予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_line, comment: 'ライン完成予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_date_manual, comment: '取説完成予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :planed_delivery_date, comment: '出荷予定日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_draw_machine, comment: '出図日_機械', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_draw_electric, comment: '出図日_電気', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_buy, comment: '部品入荷日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_supply, comment: '部品支給日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_assemble_start, comment: '組立開始日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_assemble_end, comment: '組立完了日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_exam, comment: '出荷検査日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_soft, comment: 'ソフト調整日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_line, comment: 'ライン完成日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :date_manual, comment: '取説完成日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.date :delivery_date, comment: '出荷日', default: '0000-00-00' # 0000-00-00: 回覧中, 9999-12-31: 対象外
      t.string :manager_draw_machine, comment: '機械出図担当者', limit: 40
      t.string :manager_draw_electric, comment: '電気出図担当者', limit: 40
      t.string :manager_buy, comment: '部品入荷担当者', limit: 40
      t.string :manager_supply, comment: '部品支給担当者', limit: 40
      t.string :manager_assemble_start, comment: '組立開始担当者', limit: 40
      t.string :manager_assemble_end, comment: '組立完了担当者', limit: 40
      t.string :manager_exam, comment: '出荷検査担当者', limit: 40
      t.string :manager_soft, comment: 'ソフト調整担当者', limit: 40
      t.string :manager_line, comment: 'ライン完成担当者', limit: 40
      t.string :manager_manual, comment: '取説完成担当者', limit: 40
      t.string :end_user, comment: 'エンドユーザー名', limit: 120
      t.string :middleman_1, comment: '代理店名１', limit: 120
      t.string :middleman_2, comment: '代理店名２', limit: 120
      t.string :import_pc, comment: 'インポートPC', limit: 40

      t.timestamps
    end
    add_index :products, [:control_no], unique: true
    add_index :products, :order_no
    add_index :products, :machine_code
    add_index :products, [:planed_delivery_date, :assembly_location_code], name: 'index_products_on_planed_delivery_date'
    add_index :products, [:delivery_date, :assembly_location_code], name: 'index_products_on_delivery_date'
  end
end
