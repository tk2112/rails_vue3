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
pin "vue/dist/vue.esm-browser.js", to: "vue--dist--vue.esm-browser.js.js"
```