**Using Vue3 on rails in doccker**
# Install Vue3 in local
On terminal
```
bin/importmap pin "vue/dist/vue.esm-browser.js" --download
```
edit `config/importmap.rb`
Confirm the addition.
```
pin "application", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/components", under: "components"
pin "vue", to: "vue--dist--vue.esm-browser.js.js"
```
Include Vue3
On js file
```
import * as Vue from "vue"; // by `pin "vue", to: "vue--dist--vue.esm-browser.js.js"`
```