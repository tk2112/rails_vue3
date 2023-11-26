require "test_helper"

class UploadInvoicesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get upload_invoices_new_url
    assert_response :success
  end
end
