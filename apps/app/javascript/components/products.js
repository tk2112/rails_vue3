import * as Vue from "vue";
import MyCsv from "components/my-csv";

const Products = {
    template: `
        <div class="mx-4" style="height: 10%;">
            <div class="pt-4">
                <span class="mr-2">出荷情報CSV</span>
                <input class="text-slate-500 bg-gray-50 hover:bg-gray-200 border border-blue-700 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-700" type="file" ref="fileInput" @change="handleFileUpload" />
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-2" @click="initProductInformations" v-show="csvFileName">インポート</button>
                <button class="text-white font-bold py-2 px-4 border rounded ml-2" @click="changeStateShowPlanedDate" v-show="productInformations.isSetting" :class="stylesShowPlanedDate">{{ getStateShowPlanedDateName() }}</button>
            </div>
        </div>
        <div v-show="productInformations.isSetting" class="overflow-auto mx-4" style="height: 85%;">
            <table class="relative h-full w-full py-2 text-left text-gray-500">
                <thead class="text-gray-700">
                <tr>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center">{{productInformations.columnNames[productInformations.columnIdList.control_no]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3">{{productInformations.columnNames[productInformations.columnIdList.machine_code]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3">{{productInformations.columnNames[productInformations.columnIdList.machine_name]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center">{{productInformations.columnNames[productInformations.columnIdList.order_date]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_draw_machine]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_draw_electric]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_buy]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_supply]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_assemble_start]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_assemble_end]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_exam]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_soft]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_line]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center" v-show="showPlanedDate">{{productInformations.columnNames[productInformations.columnIdList.planed_date_manual]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center">{{productInformations.columnNames[productInformations.columnIdList.planed_delivery_date]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3 text-center">{{productInformations.columnNames[productInformations.columnIdList.order_no]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3">{{productInformations.columnNames[productInformations.columnIdList.delivery_name]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3">{{productInformations.columnNames[productInformations.columnIdList.customer_name]}}</th>
                <th class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3">{{productInformations.columnNames[productInformations.columnIdList.manager_purcahse_order]}}</th>
                </tr>
                </thead>
                <tbody>
                <tr class="bg-white border-b hover:bg-gray-50" v-for="(value, index) of productInformations.data">
                <td :class="stylesCommonCell" class="text-center">{{value[productInformations.columnIdList.control_no]}}</td>
                <td :class="stylesCommonCell">{{value[productInformations.columnIdList.machine_code]}}</td> 
                <td :class="stylesCommonCell">{{value[productInformations.columnIdList.machine_name]}}</td>
                <td :class="stylesCommonCell" class="text-center">{{value[productInformations.columnIdList.order_date]}}</td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_draw_machine]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_draw_machine])">{{value[productInformations.columnIdList.planed_date_draw_machine]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_draw_electric]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_draw_electric])">{{value[productInformations.columnIdList.planed_date_draw_electric]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_buy]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_buy])">{{value[productInformations.columnIdList.planed_date_buy]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_supply]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_supply])">{{value[productInformations.columnIdList.planed_date_supply]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_assemble_start]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_assemble_start])">{{value[productInformations.columnIdList.planed_date_assemble_start]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_assemble_end]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_assemble_end])">{{value[productInformations.columnIdList.planed_date_assemble_end]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_exam]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_exam])">{{value[productInformations.columnIdList.planed_date_exam]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_soft]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_soft])">{{value[productInformations.columnIdList.planed_date_soft]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_line]), stylesCommonCell]" class="text-center">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_line])">{{value[productInformations.columnIdList.planed_date_line]}}</span>
                </td>
                <td v-show="showPlanedDate" :class="[stylesVariableCell(value[productInformations.columnIdList.planed_date_manual]), stylesCommonCell]">
                    <span :class="stylesValueHidden(value[productInformations.columnIdList.planed_date_manual])">{{value[productInformations.columnIdList.planed_date_manual]}}</span>
                </td>
                <td :class="stylesCommonCell" class="text-center">{{value[productInformations.columnIdList.planed_delivery_date]}}</td>
                <td :class="stylesCommonCell" class="text-center">{{value[productInformations.columnIdList.order_no]}}</td>
                <td :class="stylesCommonCell">{{value[productInformations.columnIdList.delivery_name]}}</td>
                <td :class="stylesCommonCell">{{value[productInformations.columnIdList.customer_name]}}</td>
                <td :class="stylesCommonCell">{{value[productInformations.columnIdList.manager_purcahse_order]}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    `,
    data(){
        return {
            productInformations: {
                isSetting: false,
                columnNames: [],
                data: [],
                columnIdList: {
                    control_no: 15,
                    machine_code: 16,
                    machine_name: 17,
                    planed_delivery_date: 18,
                    order_no: 0,
                    delivery_name: 2,
                    delivery_address: 4,
                    customer_name: 8,
                    manager_purcahse_order: 180,
                    order_date: 176,
                    planed_date_draw_machine: 135,
                    planed_date_draw_electric: 136,
                    planed_date_buy: 137,
                    planed_date_supply: 138,
                    planed_date_assemble_start: 139,
                    planed_date_assemble_end: 140,
                    planed_date_exam: 141,
                    planed_date_soft: 142,
                    planed_date_line: 143,
                    planed_date_manual: 144,
                },
            },
            showPlanedDate: false,
            csvFileName: '',
        }
    },
    created: function(){
        
    },
    methods: {
        initProductInformations() {
            const me = this;

            MyCsv.readFile(this.csvFileName).then(function(readData){
                me.productInformations.columnNames = readData.shift();
                me.productInformations.data = readData;
                me.productInformations.isSetting = true;
            });
            //console.log(this.csvData);
        },
        handleFileUpload(event) {            
            this.csvFileName = event.target.files[0];
        },
        changeStateShowPlanedDate() {
            this.showPlanedDate = !this.showPlanedDate;
        },
        getStateShowPlanedDateName() {
            return this.showPlanedDate? '各予定日を閉じる': '各予定日を開く';
        },
    },
    computed: {
        stylesShowPlanedDate: function() {
            if (this.showPlanedDate) {
                return ['border-gray-700', 'bg-gray-500', 'hover:bg-gray-700'];
            }
            else {
                return ['border-green-700', 'bg-green-500', 'hover:bg-green-700'];
            }
        },
        stylesCommonCell: function() {
            return ['whitespace-nowrap', ' px-6', 'py-3'];
        },
        stylesVariableCell: function() {
            return (planedDateValue) => {
                if (planedDateValue == '回覧対象外') {
                    return ['bg-gray-50'];
                }
                else if (planedDateValue == '未回答') {
                    return ['bg-yellow-200'];
                }
            };
        },
        stylesValueHidden: function() {
            return (planedDateValue) => {
                if (planedDateValue == '回覧対象外') {
                    return ['invisible'];
                }
            };
        },
    },
};

const app = Vue.createApp({
    components: {
        'products': Products,
    },
});

app.mount('#products');