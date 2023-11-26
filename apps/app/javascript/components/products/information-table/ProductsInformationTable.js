export const ProductsInformationTable = {
    inject: [
        'productInformations',
        'button',
    ],
    props: [
        'showDetailPlanedDate',
    ],
    template: `
    <table class="h-full w-full py-2 text-left text-gray-500">
        <thead class="text-gray-700">
        <tr>
            <th v-for="columnID in drawColumnIdList" v-show="isShowCoulumn(columnID)" class="sticky top-0 whitespace-nowrap bg-gray-50 px-6 py-3">
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
                <td v-for="columnID in drawColumnIdList" v-show="isShowCoulumn(columnID)" :class="[stylesCommonCell, stylesTextAlign(columnID), stylesVariableCell(row[columnID])]">
                    <span :class="stylesValueHidden(row[columnID])">{{ row[columnID] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
    `,
    data() {
        return {
            sortUp: 1,
            sortDown: -1,
            sortNone: 0,
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
            sortUpIcon: '<svg viewBox="0 0 24 24" stroke-width="3" class="w-6 h-6 flex fill-none stroke-blue-500 hover:stroke-blue-700"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>',
            sortDownIcon: '<svg viewBox="0 0 24 24" stroke-width="3" class="w-6 h-6 flex fill-none stroke-blue-500 hover:stroke-blue-700"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>',
            sortDefaultIcon: '<svg viewBox="0 0 24 24" stroke-width="3" class="w-6 h-6 flex fill-none stroke-blue-500 hover:stroke-blue-700"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg>',
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
        }
    },
    methods: {
        toggleCoulumnSort(columnID) {
            if (this.isUpCoulumnSort(columnID)) {
                // 現在が昇順の場合は降順に
                this.columnSort[columnID] = this.sortDown;
            }
            else if (this.isDownCoulumnSort(columnID)) {
                // 現在が降順の場合はデフォルトに
                delete this.columnSort[columnID];
            }
            else {
                // 現在がデフォルトの場合は昇順に
                this.columnSort[columnID] = this.sortUp;
            }
            
            // 並び替え
            this.productInformations.data.sort((a, b) => {
                for (let columnID in this.columnSort) {
                    // 昇順
                    if (this.columnSort[columnID] == this.sortUp) {
                        if (a[columnID] < b[columnID]) return -1;
                        if (a[columnID] > b[columnID]) return 1;
                    }
                    // 降順
                    else if (this.columnSort[columnID] == this.sortDown) {
                        if (a[columnID] < b[columnID]) return 1;
                        if (a[columnID] > b[columnID]) return -1;
                    }
                    
                }
                return 0; // すべての列が同じ場合、順序を変更しない
            });
            // console.log(this.productInformations.columnSort);
        },
        // 引数の列IDが昇順か？
        isUpCoulumnSort(coulumnID) {
            return this.columnSort[coulumnID] == this.sortUp? true: false;
        },
        // 引数の列IDが降順か？
        isDownCoulumnSort(coulumnID) {
            return this.columnSort[coulumnID] == this.sortDown? true: false;
        },
        // 引数の列IDは表示するか？
        isShowCoulumn(coulumnID) {
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
        stylesTextAlign(columnId) {
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
        },
        stylesVariableCell(planedDateValue) {
            if (planedDateValue == '回覧対象外') {
                return ['bg-gray-50'];
            }
            else if (planedDateValue == '未回答') {
                return ['bg-yellow-200'];
            }
        },
        stylesValueHidden(planedDateValue) {
            if (planedDateValue == '回覧対象外') {
                return ['invisible'];
            }
        },
    },
    computed: {
        stylesShowDetailPlanedDate() {
            if (this.showDetailPlanedDate) {
                return this.button.procClass;
            }
            else {
                return this.button.middleClass;
            }
        },
        stylesCommonCell() {
            return ['whitespace-nowrap', ' px-6', 'py-3'];
        },
    },
};