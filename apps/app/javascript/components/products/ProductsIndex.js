import * as Vue from "vue";
import MyCsv from "../../modules/my-csv";
import { ProductsInformationTable } from "./information-table/ProductsInformationTable";
import { ShowDetailPlanedDateButton } from "./information-table/parts/show-detail-planed-date-button";
import { ShowshowGanttChartButton } from "./gantt-chart/parts/show-gantt-chart-button";
import { SelectWithinIntervalGanttChartButton } from "./gantt-chart/parts/select-within-interval-gantt-chart-button";
import { ProductsGanttChart } from "./gantt-chart/ProductsGanttChart";
import {  parse, format, getDay, addDays, isBefore } from 'date-fns'

const Products = {
    template: `
        <div class="mx-4 pt-4 flex flex-row" style="height: 10%;">
            <div>
                <span class="mr-2">出荷情報CSV</span>
                <input class="w-96 text-slate-500 bg-gray-50 hover:bg-gray-200 border border-blue-700 rounded-lg file:mr-4 file:px-4 file:py-3 file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-700" type="file" ref="fileInput" @change="handleFileUpload" />
                <button v-show="csvFileName" class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 border border-blue-700 rounded-lg ml-2" @click="initProductInformations">インポート</button>
            </div>
            <span v-show="productInformations.isSetting" class="ml-2">
                <showDetailPlanedDateButton @changeStateShowDetailPlanedDateClicked="changeStateShowDetailPlanedDate" :showDetailPlanedDate="showDetailPlanedDate" />
            </span>
            <span v-show="productInformations.isSetting" class="ml-2">
                <showshowGanttChartButton @changeStateGanttChartClicked="changeStateGanttChart" :showGanttChart="showGanttChart" />
            </span>
            <span v-show="productInformations.isSetting" class="ml-2">
                <selectWithinIntervalGanttChartButton v-show="showGanttChart" />
            </span>
            <span class="ml-2">
                <a :href="domProperties.homeUrl">ホームへ戻る</a>
            </span>
        </div>
        <div v-if="productInformations.isSetting" style="height: 85%;">
            <div v-show="showPlanedDate" class="overflow-auto mx-4" style="height: 100%;">
                <informationTable :showDetailPlanedDate="showDetailPlanedDate" />
            </div>
            <div v-show="showGanttChart" class="overflow-auto mx-4" style="height: 100%;">
                <ganttChart />
            </div>
        </div>
    `,
    components: {
        'showDetailPlanedDateButton': ShowDetailPlanedDateButton,
        'showshowGanttChartButton': ShowshowGanttChartButton,
        'selectWithinIntervalGanttChartButton': SelectWithinIntervalGanttChartButton,
        'informationTable': ProductsInformationTable,
        'ganttChart': ProductsGanttChart,
    },
    data() {
        return {
            domProperties: document.getElementById('entry-list').dataset,
            showPlanedDate: false,
            showDetailPlanedDate: false,
            showGanttChart: true,
            productInformations: {
                isSetting: false,
                data: [],
                dataInHoliday: {},
                dataInSaturday: [],
                dataInSunday: [],
                minDate: '',
                maxDate: '',
                columnNames: {},
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
            csvFileName: '',
            button: {
                procClass: ['border-gray-400', 'bg-gray-200', 'hover:bg-gray-400', 'text-black', 'font-bold', 'px-4', 'py-3', 'border', 'rounded-lg'],
                middleClass: ['border-green-700', 'bg-green-500', 'hover:bg-green-700', 'text-white', 'font-bold', 'px-4', 'py-3', 'border', 'rounded-lg'],
            },
            googleApiToken: 'AIzaSyDnbOQEIbzol63kPiON5rgIZ8WTqE802kU',
        }
    },
    props: [

    ],
    created: function(){
        
    },
    mounted : function(){
        console.log(this.test);
    },
    provide() {
        return {
            productInformations: this.productInformations,
            button: this.button,
            countDateMinBetweenMax: this.countDateMinBetweenMax,
        }
    },
    methods: {
        // CSVから出荷情報をセット
        initProductInformations() {
            const me = this;

            MyCsv.readFile(this.csvFileName)
                .then(function(readData){
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
                    
                    me.setMinAndMaxDate(); // 最小日付と最大日付をセット
                    me.productInformations.isSetting = true;
                })
                .then(function(){
                    // 土日を設定
                    for (const currentFormattedDate of me.countDateMinBetweenMax()) {
                        const date = parse(currentFormattedDate, 'yyyy-MM-dd', new Date());
                        const dayOfWeek = getDay(date);

                        // 日曜日
                        if (dayOfWeek == 0) {
                            me.productInformations.dataInSunday.push(currentFormattedDate);
                        }
                        // 土曜日
                        else if (dayOfWeek == 6) {
                            me.productInformations.dataInSaturday.push(currentFormattedDate);
                        }
                    }
                })
                .then(function(){
                    // Google Calender APIを使って祝日を設定
                    const googleCalender = 
                        `https://www.googleapis.com/calendar/v3/calendars/ja.japanese%23holiday@group.v.calendar.google.com/events?maxResults=100&orderBy=startTime&singleEvents=true&key=${me.googleApiToken}&timeMin=${me.productInformations.minDate}T00:00:00Z&timeMax=${me.productInformations.maxDate}T23:59:59Z`;
                        
                    fetch(googleCalender)
                        .then(response => {
                            // レスポンスからJSONデータを取得
                            return response.json();
                        })
                        .then(data => {
                            // データの取得に成功した場合の処理
                            for (const item of data.items) {
                                me.productInformations.dataInHoliday[item.start.date] = item.summary;
                            }
                        })
                        .catch(error => {
                            // エラーが発生した場合の処理
                            console.error('データの取得に失敗しました', error);
                        });    
                });
            
        },
        // 読み込みファイル名をCSV名としてセット
        handleFileUpload(event) {            
            this.csvFileName = event.target.files[0];
        },
        // 各予定日の詳細 ON/OFF
        changeStateShowDetailPlanedDate() {
            this.showDetailPlanedDate = !this.showDetailPlanedDate;
        },
        // ガントチャート ON/OFF
        changeStateGanttChart() {
            this.showGanttChart = !this.showGanttChart;
            this.showPlanedDate = !this.showPlanedDate;
        },
        // 最小日付と最大日付をセット
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

    },
};

const app = Vue.createApp({
    components: {
        'products': Products,
        'informationTable': ProductsInformationTable,
        'ganttChart': ProductsGanttChart,
    },
});

app.mount('#products');