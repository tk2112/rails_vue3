import * as Vue from "vue";
import MyCsv from "../modules/my-csv";
import { GanttChart } from "./gantt-chart";
import {  parse, format, addDays, isBefore } from 'date-fns'

const Products = {
    template: `
        <div class="mx-4" style="height: 10%;">
            <div class="pt-4">
                <span class="mr-2">出荷情報CSV</span>
                <input class="w-96 text-slate-500 bg-gray-50 hover:bg-gray-200 border border-blue-700 rounded file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-700" type="file" ref="fileInput" @change="handleFileUpload" />
                <button v-show="csvFileName" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded ml-2" @click="initProductInformations">インポート</button>
                <button v-show="productInformations.isSetting" class="ml-2 w-44" @click="changeStateShowDetailPlanedDate" :class="stylesShowDetailPlanedDate">{{ getStateShowDetailPlanedDateName() }}</button>
                <button v-show="productInformations.isSetting" class="ml-2 w-44" @click="changeStateGanttChart" :class="stylesShowGanttChart()">{{ getStateShowGanttChart() }}</button>
            </div>
        </div>
        <div v-if="productInformations.isSetting" style="height: 85%;">
            <div v-show="showPlanedDate" class="overflow-auto mx-4" style="height: 100%;">
                <table class="h-full w-full py-2 text-left text-gray-500">
                    <thead class="text-gray-700">
                    <tr>
                        <th v-for="columnID in productInformations.drawColumnIdList" v-show="isShow(columnID)" class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3">
                            <span class="flex">
                                <span :class="stylesTextAlign(columnID)">{{ productInformations.columnNames[columnID] }}</span>
                                <span v-if="isUpCoulumnSort(columnID)" @click="toggleCoulumnSort(columnID)" v-html="sortUpIcon" class="flex items-center justify-center pl-2" />
                                <span v-else-if="isDownCoulumnSort(columnID)" @click="toggleCoulumnSort(columnID)" v-html="sortDownIcon" class="flex items-center justify-center pl-2" />
                                <span v-else @click="toggleCoulumnSort(columnID)" v-html="sortDefaultIcon" class="flex items-center justify-center pl-2" />
                            </span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="row in productInformations.data" class="bg-white border-b hover:bg-gray-50">
                        <td v-for="columnID in productInformations.drawColumnIdList" v-show="isShow(columnID)" :class="[stylesCommonCell, stylesTextAlign(columnID), stylesVariableCell(row[columnID])]">
                            <span :class="stylesValueHidden(row[columnID])">{{ row[columnID] }}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div v-show="showGanttChart">
                <ganttChart />
            </div>
        </div>
    `,
    components: {
        'ganttChart': GanttChart,
    },
    data() {
        return {
            sortUp: 1,
            sortDown: -1,
            sortNone: 0,
            productInformations: {
                data: [],
                isSetting: false,
                minDate: '',
                maxDate: '',
                columnNames: {},
                columnSort: {},
                drawColumnIdList: [ // 描画はこの並びに基づく
                    'control_no',
                    'machine_code',
                    'machine_name',
                    'order_date',
                    'planed_date_draw_machine',
                    'planed_date_draw_electric',
                    'planed_date_buy',
                    'planed_date_supply',
                    'planed_date_assemble_start',
                    'planed_date_assemble_end',
                    'planed_date_exam',
                    'planed_date_soft',
                    'planed_date_line',
                    'planed_date_manual',
                    'planed_delivery_date',
                    'order_no',
                    'delivery_name',
                    'delivery_address',
                    'customer_name',
                    'manager_purcahse_order',
                ],
                columnIdList: {
                    control_no: 15,
                    machine_code: 16,
                    machine_name: 17,
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
                    planed_delivery_date: 18,
                    order_no: 0,
                    delivery_name: 2,
                    delivery_address: 4,
                    customer_name: 8,
                    manager_purcahse_order: 180,
                    order_status: 92,
                    order_detail_no: 1,
                    product_no: 131,
                    composition_no: 175,
                    control_no_labels: 132,
                    amount_labels: 133,
                    unit_price: 174,
                    preferred_delivery_date_header: 170,
                    preferred_delivery_date: 171,
                    delivery_date_order: 127,
                    delivery_post: 3,
                    delivery_address: 4,
                    delivery_tel: 5,
                    delivery_fax: 6,
                    delivery_manager: 7,
                    customer_post: 9,
                    customer_address: 10,
                    customer_tel: 11,
                    customer_fax: 12,
                    customer_manager: 13,
                    assembly_location_code: 172,
                    assembly_location_name: 128,
                    arch_width: 21,
                    arch_height: 22,
                    band_size: 23,
                    frequency: 24,
                    voltage: 25,
                    other_spec_01: 26,
                    other_spec_02: 27,
                    other_spec_03: 28,
                    other_spec_04: 29,
                    other_spec_05: 30,
                    other_spec_06: 31,
                    other_spec_07: 32,
                    other_spec_08: 33,
                    other_spec_09: 34,
                    other_spec_10: 35,
                    other_spec_11: 36,
                    other_spec_12: 37,
                    other_spec_13: 38,
                    other_spec_14: 39,
                    other_spec_15: 40,
                    other_spec_16: 41,
                    other_spec_17: 42,
                    other_spec_18: 43,
                    other_spec_19: 44,
                    other_spec_20: 45,
                    other_spec_21: 46,
                    other_spec_22: 47,
                    other_spec_23: 48,
                    other_spec_24: 49,
                    color: 83,
                    power_consumption: 84,
                    breaking_capacity: 85,
                    full_load_current: 86,
                    sequence_no: 87,
                    note_product_common: 130,
                    note_product_special_spec: 126,
                    note_product_inner: 173,
                    note_order_detail: 93,
                    note_order_common: 94,
                    note_order_only_base: 145,
                    note_order_shipment: 95,
                    shipment_company: 19,
                    shipment_no: 20,
                    planed_man_hours: 157,
                    date_draw_machine: 147,
                    date_draw_electric: 148,
                    date_buy: 149,
                    date_supply: 150,
                    date_assemble_start: 151,
                    date_assemble_end: 152,
                    date_exam: 153,
                    date_soft: 154,
                    date_line: 155,
                    date_manual: 156,
                    delivery_date: 169,
                    manager_draw_machine: 159,
                    manager_draw_electric: 160,
                    manager_buy: 161,
                    manager_supply: 162,
                    manager_assemble_start: 163,
                    manager_assemble_end: 164,
                    manager_exam: 165,
                    manager_soft: 166,
                    manager_line: 167,
                    manager_manual: 168,
                    end_user: 177,
                    middleman_1: 178,
                    middleman_2: 179,
                },
            },
            showPlanedDate: true,
            showDetailPlanedDate: false,
            showGanttChart: false,
            csvFileName: '',
            sortUpIcon: '<svg viewBox="0 0 24 24" stroke-width="3" class="w-6 h-6 flex fill-none stroke-blue-500 hover:stroke-blue-700"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>',
            sortDownIcon: '<svg viewBox="0 0 24 24" stroke-width="3" class="w-6 h-6 flex fill-none stroke-blue-500 hover:stroke-blue-700"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>',
            sortDefaultIcon: '<svg viewBox="0 0 24 24" stroke-width="3" class="w-6 h-6 flex fill-none stroke-blue-500 hover:stroke-blue-700"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>',
            button: {
                procClass: ['border-gray-700', 'bg-gray-500', 'hover:bg-gray-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'border', 'rounded'],
                middleClass: ['border-green-700', 'bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold', 'py-2', 'px-4', 'border', 'rounded'],
            },
        }
    },
    created: function(){
        
    },
    mounted : function(){
        
    },
    provide() {
        return {
            productInformations: this.productInformations,
            button: this.button,
            countDateMinBetweenMax: this.countDateMinBetweenMax,
            showDetailPlanedDate: this.showDetailPlanedDate,
        }
    },
    methods: {
        initProductInformations() {
            const me = this;

            MyCsv.readFile(this.csvFileName).then(function(readData){
                const columnNames = readData.shift(); // CSVデータの1行目を列名称行として配列保存
                
                for (let [key, value] of Object.entries(me.productInformations.columnIdList)) {
                    me.productInformations.columnNames[key] = columnNames[value];
                }
 
                for (var n = 0; n < readData.length; n++) {
                    let row = readData[n];

                    me.productInformations.data.push({});
                    
                    for (let key in me.productInformations.columnNames) {
                        me.productInformations.data[n][key] = row[me.productInformations.columnIdList[key]];
                    }
                }
                me.productInformations.isSetting = true;
                me.setMinAndMaxDate(); // 最小日付と最大日付をセット

                // console.log(me.productInformations.minDate);
                // console.log(me.productInformations.maxDate);
            });
        },
        handleFileUpload(event) {            
            this.csvFileName = event.target.files[0];
        },
        changeStateShowDetailPlanedDate() {
            this.showDetailPlanedDate = !this.showDetailPlanedDate;
        },
        getStateShowDetailPlanedDateName() {
            return this.showDetailPlanedDate? '各予定日を閉じる': '各予定日を開く';
        },
        toggleCoulumnSort(columnID) {
            if (this.isUpCoulumnSort(columnID)) {
                // 現在が昇順の場合は降順に
                this.productInformations.columnSort[columnID] = this.sortDown;
            }
            else if (this.isDownCoulumnSort(columnID)) {
                // 現在が降順の場合はデフォルトに
                delete this.productInformations.columnSort[columnID];
            }
            else {
                // 現在がデフォルトの場合は昇順に
                this.productInformations.columnSort[columnID] = this.sortUp;
            }
            
            // 並び替え
            this.productInformations.data.sort((a, b) => {
                for (let columnID in this.productInformations.columnSort) {
                    // 昇順
                    if (this.productInformations.columnSort[columnID] == this.sortUp) {
                        if (a[columnID] < b[columnID]) return -1;
                        if (a[columnID] > b[columnID]) return 1;
                    }
                    // 降順
                    else if (this.productInformations.columnSort[columnID] == this.sortDown) {
                        if (a[columnID] < b[columnID]) return 1;
                        if (a[columnID] > b[columnID]) return -1;
                    }
                    
                }
                return 0; // すべての列が同じ場合、順序を変更しない
            });
            // console.log(this.productInformations.columnSort);
        },
        isUpCoulumnSort(coulumnID) {
            return this.productInformations.columnSort[coulumnID] == this.sortUp? true: false;
        },
        isDownCoulumnSort(coulumnID) {
            return this.productInformations.columnSort[coulumnID] == this.sortDown? true: false;
        },
        isShow(coulumnID) {
            switch (coulumnID) {
                case 'planed_date_draw_machine':
                case 'planed_date_draw_electric':
                case 'planed_date_buy':
                case 'planed_date_supply':
                case 'planed_date_assemble_start':
                case 'planed_date_assemble_end':
                case 'planed_date_exam':
                case 'planed_date_soft':
                case 'planed_date_line':
                case 'planed_date_manual':
                    return this.showDetailPlanedDate;
                    break;
                default:
                    return true;
                    break;
            }
        },
        changeStateGanttChart() {
            this.showGanttChart = !this.showGanttChart;
            this.showPlanedDate = !this.showPlanedDate;
        },
        getStateShowGanttChart() {
            return this.showGanttChart? '出荷情報一覧を開く': 'ガントチャートを開く';
        },
        stylesShowGanttChart() {
            if (this.showGanttChart) {
                return this.button.procClass;
            }
            else {
                return this.button.middleClass;
            }
        },
        setMinAndMaxDate() {
            const columnDateId = [
                'order_date',
                'planed_date_draw_machine',
                'planed_date_draw_electric',
                'planed_date_buy',
                'planed_date_supply',
                'planed_date_assemble_start',
                'planed_date_assemble_end',
                'planed_date_exam',
                'planed_date_soft',
                'planed_date_line',
                'planed_date_manual',
                'planed_delivery_date',
            ];
            const isInvalidDate = (date) => Number.isNaN(date.getTime());
            
            for (const row of this.productInformations.data) {
                for (const columnID of columnDateId) {
                    const japaneseDate = row[columnID];
                    const parsedDate = parse(japaneseDate, 'yyyy/MM/dd', new Date());

                    if (!isInvalidDate(parsedDate)) {
                        const formattedDate = format(parsedDate, 'yyyy-MM-dd');

                        if (!this.productInformations.minDate || formattedDate < this.productInformations.minDate) this.productInformations.minDate = formattedDate;
                        if (!this.productInformations.maxDate || formattedDate > this.productInformations.maxDate) this.productInformations.maxDate = formattedDate;
                    }
                }
            }
        },
        countDateMinBetweenMax() {
            const startDate =  parse(this.productInformations.minDate, 'yyyy-MM-dd', new Date());
            const endDate =  parse(this.productInformations.maxDate, 'yyyy-MM-dd', new Date());
            let currentDate = startDate;
            let re = [];

            while (isBefore(currentDate, endDate) || currentDate.getTime() === endDate.getTime()) {
                const formattedDate = format(currentDate, 'yyyy-MM-dd');
                re.push(formattedDate);
                currentDate = addDays(currentDate, 1);
            }

            return re;
        },
    },
    computed: {
        stylesTextAlign: function() {
            return (columnId) => {
                switch (columnId) {
                    case 'control_no':
                    case 'planed_delivery_date':
                    case 'order_no':
                    case 'order_date':
                    case 'planed_date_draw_machine':
                    case 'planed_date_draw_electric':
                    case 'planed_date_buy':
                    case 'planed_date_supply':
                    case 'planed_date_assemble_start':
                    case 'planed_date_assemble_end':
                    case 'planed_date_exam':
                    case 'planed_date_soft':
                    case 'planed_date_line':
                    case 'planed_date_manual':
                        return 'text-center';
                        break;
                    default:
                        return 'text-left';
                        break;
                }
            };
        },
        stylesShowDetailPlanedDate: function() {
            if (this.showDetailPlanedDate) {
                return this.button.procClass;
            }
            else {
                return this.button.middleClass;
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
        'ganttChart': GanttChart,
    },
});

app.mount('#products');