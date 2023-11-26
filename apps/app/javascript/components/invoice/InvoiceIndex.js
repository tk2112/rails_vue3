import * as Vue from "vue";
import {getCsrfToken} from "../../modules/getCsrfToken";

const Invoice = {
    template: `
    <div>
        <form class="flex flex-row items-center  justify-center" enctype="multipart/form-data" action="/invoice" accept-charset="UTF-8" method="post">
            <input 
                type="hidden" 
                name="authenticity_token" 
                :value="token" 
                autocomplete="off" />
            <label 
                :for="inputFile"
                class="flex items-center mr-2"
                style="height: 3rem;" >
                インヴォイスをアップロード
            </label>
            <input 
                class="w-96 text-slate-500 bg-gray-50 hover:bg-gray-200 border-y border-l border-blue-700 rounded-l-lg file:mr-4 file:px-4 file:py-3 file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-700" 
                style="height: 3rem;" 
                type="file" 
                ref="fileInput" 
                :name="inputFile" 
                :id="inputFile" 
                @change="setInputFileName" />
            <input type="text" 
                class="bg-gray-200 border-y border-r border-l-0 border-blue-700 rounded-r-lg text-gray-900 text-sm px-4 py-3 " 
                style="height: 3rem;"
                readonly 
                :name="inputName" 
                :id="inputName" 
                :value=inputFileName />
            <input type="submit" 
                :class="button.runClass" 
                class="ml-2" 
                style="height: 3rem;"
                name="commit" 
                data-disable-with="保存しています..." 
                value="保存" />
        </form>
    </div>
    `,
    data() {
        return {
            token: '', 
            inputFileName: '', 
            button: {
                runClass: ['bg-blue-500', 'hover:bg-blue-700', 'border', 'border-blue-700', 'rounded-lg', 'text-white', 'font-bold', 'px-4', 'py-3'],
                procClass: ['border-gray-400', 'bg-gray-200', 'hover:bg-gray-400', 'text-black', 'font-bold', 'px-4', 'py-3', 'border', 'rounded-lg'],
                middleClass: ['border-green-700', 'bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold', 'px-4', 'py-3', 'border', 'rounded-lg'],
            },
        }
    },
    props: [
        'inputName', 
        'inputFile', 
    ],
    mounted : function(){
        this.token = getCsrfToken();
    },
    methods: {
        setInputFileName() {
            const fileform = document.getElementById(this.inputFile);
            const inputfile = fileform.files[0];
            const inputfileName = inputfile.name;
            let inputfileNameStr = '';

            for (let i = inputfileName.length - 1; i >= 0; i--) {
                if (inputfileName[i] === '\.') {
                    inputfileNameStr = inputfileName.slice(0, i);
                    break;
                }
            }
            this.inputFileName = inputfileNameStr;
        },
    },
};

const app = Vue.createApp({
    components: {
        'invoice': Invoice,
    },
});

app.mount('#invoice');