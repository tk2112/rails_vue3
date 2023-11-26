# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_11_25_021846) do
  create_table "active_storage_attachments", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb4", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", charset: "utf8mb4", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "invoices", charset: "utf8mb4", force: :cascade do |t|
    t.string "name", null: false, comment: "ファイル名称"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_invoices_on_name", unique: true
  end

  create_table "products", charset: "utf8mb4", force: :cascade do |t|
    t.string "control_no", limit: 8, null: false, comment: "管理番号"
    t.string "machine_code", limit: 50, comment: "機種コード"
    t.string "machine_name", limit: 40, comment: "機種名称"
    t.string "order_status", limit: 50, comment: "受注ステータス"
    t.string "order_no", limit: 30, comment: "受注番号"
    t.integer "order_detail_no", comment: "受注明細番号"
    t.string "product_no", limit: 12, comment: "製品仕様番号"
    t.string "composition_no", limit: 10, comment: "受注構成番号"
    t.string "control_no_labels", limit: 20, comment: "管理番号表記"
    t.integer "amount_labels", comment: "台数"
    t.integer "unit_price", comment: "売上単価"
    t.date "order_date", comment: "受注日"
    t.string "preferred_delivery_date_header", default: "0000-00-00", comment: "希望納期_受注ヘッダー"
    t.string "preferred_delivery_date", comment: "希望納期_受注詳細"
    t.date "delivery_date_order", comment: "受注_出荷日"
    t.string "manager_purcahse_order", comment: "発注担当者名"
    t.string "delivery_name", limit: 120, comment: "納品先名称"
    t.string "delivery_post", limit: 8, comment: "納品先郵便番号"
    t.string "delivery_address", limit: 200, comment: "納品先住所"
    t.string "delivery_tel", limit: 20, comment: "納品先電話番号"
    t.string "delivery_fax", limit: 20, comment: "納品先FAX番号"
    t.string "delivery_manager", comment: "納品先担当者名"
    t.string "customer_name", limit: 120, comment: "得意先名称"
    t.string "customer_post", limit: 8, comment: "得意先郵便番号"
    t.string "customer_address", limit: 200, comment: "得意先住所"
    t.string "customer_tel", limit: 20, comment: "得意先電話番号"
    t.string "customer_fax", limit: 20, comment: "得意先FAX番号"
    t.string "customer_manager", limit: 40, comment: "得意先担当者名"
    t.string "assembly_location_code", limit: 9, comment: "組立場所倉庫コード"
    t.string "assembly_location_name", limit: 40, comment: "組立場所倉庫名称"
    t.string "arch_width", limit: 150, comment: "アーチ幅"
    t.string "arch_height", limit: 150, comment: "アーチ高"
    t.string "band_size", limit: 150, comment: "バンドサイズ"
    t.string "frequency", limit: 150, comment: "周波数"
    t.string "voltage", limit: 150, comment: "電圧"
    t.string "other_spec_01", limit: 150, comment: "項目1"
    t.string "other_spec_02", limit: 150, comment: "項目2"
    t.string "other_spec_03", limit: 150, comment: "項目3"
    t.string "other_spec_04", limit: 150, comment: "項目4"
    t.string "other_spec_05", limit: 150, comment: "項目5"
    t.string "other_spec_06", limit: 150, comment: "項目6"
    t.string "other_spec_07", limit: 150, comment: "項目7"
    t.string "other_spec_08", limit: 150, comment: "項目8"
    t.string "other_spec_09", limit: 150, comment: "項目9"
    t.string "other_spec_10", limit: 150, comment: "項目10"
    t.string "other_spec_11", limit: 150, comment: "項目11"
    t.string "other_spec_12", limit: 150, comment: "項目12"
    t.string "other_spec_13", limit: 150, comment: "項目13"
    t.string "other_spec_14", limit: 150, comment: "項目14"
    t.string "other_spec_15", limit: 150, comment: "項目15"
    t.string "other_spec_16", limit: 150, comment: "項目16"
    t.string "other_spec_17", limit: 150, comment: "項目17"
    t.string "other_spec_18", limit: 150, comment: "項目18"
    t.string "other_spec_19", limit: 150, comment: "項目19"
    t.string "other_spec_20", limit: 150, comment: "項目20"
    t.string "other_spec_21", limit: 150, comment: "項目21"
    t.string "other_spec_22", limit: 150, comment: "項目22"
    t.string "other_spec_23", limit: 150, comment: "項目23"
    t.string "other_spec_24", limit: 150, comment: "項目24"
    t.string "color", limit: 150, comment: "塗装色"
    t.string "power_consumption", limit: 10, comment: "定格消費電力(Kva)"
    t.string "breaking_capacity", limit: 10, comment: "短絡遮断容量/SCCR"
    t.string "full_load_current", limit: 10, comment: "全負荷電流/FLC"
    t.string "sequence_no", limit: 30, comment: "シーケンス番号"
    t.text "note_product_common", comment: "製品仕様_共通備考"
    t.text "note_product_special_spec", comment: "特注仕様"
    t.text "note_product_inner", comment: "製品仕様_内部連絡事項"
    t.text "note_order_detail", comment: "受注詳細摘要"
    t.text "note_order_common", comment: "受注_備考_共通"
    t.text "note_order_only_base", comment: "受注_備考_拠点内"
    t.text "note_order_shipment", comment: "受注_運送情報_送り状印字"
    t.string "shipment_company", limit: 120, comment: "運送会社"
    t.string "shipment_no", limit: 50, comment: "運送伝票"
    t.float "planed_man_hours", comment: "予定工数"
    t.date "planed_date_draw_machine", comment: "出図予定日_機械"
    t.date "planed_date_draw_electric", comment: "出図予定日_電気"
    t.date "planed_date_buy", comment: "部品入荷予定日"
    t.date "planed_date_supply", comment: "部品支給予定日"
    t.date "planed_date_assemble_start", comment: "組立開始予定日"
    t.date "planed_date_assemble_end", comment: "組立完了予定日"
    t.date "planed_date_exam", comment: "出荷検査予定日"
    t.date "planed_date_soft", comment: "ソフト調整予定日"
    t.date "planed_date_line", comment: "ライン完成予定日"
    t.date "planed_date_manual", comment: "取説完成予定日"
    t.date "planed_delivery_date", comment: "出荷予定日"
    t.date "date_draw_machine", comment: "出図日_機械"
    t.date "date_draw_electric", comment: "出図日_電気"
    t.date "date_buy", comment: "部品入荷日"
    t.date "date_supply", comment: "部品支給日"
    t.date "date_assemble_start", comment: "組立開始日"
    t.date "date_assemble_end", comment: "組立完了日"
    t.date "date_exam", comment: "出荷検査日"
    t.date "date_soft", comment: "ソフト調整日"
    t.date "date_line", comment: "ライン完成日"
    t.date "date_manual", comment: "取説完成日"
    t.date "delivery_date", comment: "出荷日"
    t.string "manager_draw_machine", limit: 40, comment: "機械出図担当者"
    t.string "manager_draw_electric", limit: 40, comment: "電気出図担当者"
    t.string "manager_buy", limit: 40, comment: "部品入荷担当者"
    t.string "manager_supply", limit: 40, comment: "部品支給担当者"
    t.string "manager_assemble_start", limit: 40, comment: "組立開始担当者"
    t.string "manager_assemble_end", limit: 40, comment: "組立完了担当者"
    t.string "manager_exam", limit: 40, comment: "出荷検査担当者"
    t.string "manager_soft", limit: 40, comment: "ソフト調整担当者"
    t.string "manager_line", limit: 40, comment: "ライン完成担当者"
    t.string "manager_manual", limit: 40, comment: "取説完成担当者"
    t.string "end_user", limit: 120, comment: "エンドユーザー名"
    t.string "middleman_1", limit: 120, comment: "代理店名１"
    t.string "middleman_2", limit: 120, comment: "代理店名２"
    t.string "import_pc", limit: 40, comment: "インポートPC"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["control_no"], name: "index_products_on_control_no", unique: true
    t.index ["delivery_date", "assembly_location_code"], name: "index_products_on_delivery_date"
    t.index ["machine_code"], name: "index_products_on_machine_code"
    t.index ["order_no"], name: "index_products_on_order_no"
    t.index ["planed_delivery_date", "assembly_location_code"], name: "index_products_on_planed_delivery_date"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
