class Invoice < ApplicationRecord
    has_one_attached :invoice_file

end
