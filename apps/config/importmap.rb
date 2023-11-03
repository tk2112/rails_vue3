# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "stimulus.min.js", preload: true
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/components", under: "components"
pin "vue", to: "vue--dist--vue.esm-browser.js.js" # @3.3.4pin "encoding-japanese" # @2.0.0
pin "encoding", to: "encoding-japanese.js"
pin "date-fns", to: "https://ga.jspm.io/npm:date-fns@2.27.0/esm/index.js" # @2.30.0
