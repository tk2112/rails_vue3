import { Application } from "@hotwired/stimulus"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application

export { application }

import * as Vue from "vue/dist/vue.esm-browser.js"; // Vueの読み込み