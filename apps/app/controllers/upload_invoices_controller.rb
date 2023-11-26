class UploadInvoicesController < ApplicationController
  def index
    
  end

  def create
    @invoice = Invoice.new(invoice_params)

    if @invoice.save
      
    else
      
    end
  end

  private

  def invoice_params
      params.permit(:name, :invoice_file)
  end
end
