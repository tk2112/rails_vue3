import * as Vue from "vue";
import Encoding from "encoding"; // https://github.com/polygonplanet/encoding.js/blob/master/README_ja.md

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
            
            if (file) {
                const reader = new FileReader();
        
                reader.onload = (e) => { // コールバック関数設定、ファイル読み込みが完了すると非同期に呼び出される
                    const codes = new Uint8Array(e.target.result); // アップロードファイルをバイナリデータの配列に変換
                    const detectedEncoding = Encoding.detect(codes); // 文字コード判定
                    // const csvData = this.parseCSV(e.target.result);
                    // this.csvData = csvData;

                    console.log(detectedEncoding);
                };
        
                //reader.readAsText(file); // ファイル読み込み開始
                reader.readAsArrayBuffer(file); // ファイル読み込み開始
            }
        },
        parseCSV(bin) {
            const decoder = new TextDecoder('shift_jis');
            const csvText = decoder.decode(bin);
            const lines = csvText.split('\n');
            const headers = lines[0].split(',');
            const data = [];
        
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',');
                if (values.length === headers.length) {
                const row = {};
                for (let j = 0; j < headers.length; j++) {
                    row[headers[j]] = values[j];
                }
                data.push(row);
                }
            }
        
            return data;
        },
    }

};

const app = Vue.createApp({
    components: {
        'products': Products,
    },
});

app.mount('#products');