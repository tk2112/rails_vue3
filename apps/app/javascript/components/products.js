import * as Vue from "vue";
import MyCsv from "components/my-csv";

const Products = {
    template: `
        <input type="file" ref="fileInput" @change="handleFileUpload" />
        <p>test</p>
    `,
    data(){
        return {
            productInformations: [],
            csvData: [],
        }
    },
    created: function(){
        this.initProductInformations();
    },
    methods: {
        initProductInformations() {
            
        },
        handleFileUpload(event) {            
            const file = event.target.files[0];
            
            MyCsv.readFile(file);
        },
    }

};

const app = Vue.createApp({
    components: {
        'products': Products,
    },
});

app.mount('#products');