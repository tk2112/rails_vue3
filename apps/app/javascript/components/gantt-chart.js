import { parse, format, getDate, getMonth, getYear, isBefore, isAfter, isEqual, isWithinInterval, isValid } from 'date-fns';

export const GanttChart = {
    template: `
    <div class="w-full flex flex-col">
        <div class="sticky top-0">
        <div class="flex flex-row items-center">
            <h3 class="font-semibold text-gray-900 dark:text-white">月単位選択</h3>
            <ul class="ml-2 inline-block text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="inline-block w-40 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">1ケ月</label>
                    </div>
                </li>
                <li class="inline-block w-40 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="horizontal-list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">3ケ月</label>
                    </div>
                </li>
                <li class="inline-block w-40 border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center pl-3">
                        <input id="horizontal-list-radio-millitary" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="horizontal-list-radio-millitary" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">6ケ月</label>
                    </div>
                </li>
            </ul>
        </div>
        <div class="flex flex-row" style="padding-left: 14rem; padding-top: 1rem" v-html="drawYearMonth()" />
        <div class="flex flex-row" v-html="drawDay()" />
        </div>
        <div class="flex flex-col" v-html="drawPlan()" />
    </div>
    `,
    inject: [
        'productInformations',
        'button',
    ],
    // props: {
    //     data: {
    //         type: Array,
    //     },
    // },
    data() {
        return {
            
        }
    },
    created() {
        
    },
    mounted() {
        // console.log(this.button.procClass);
    },
    methods: {
        drawYearMonth() {
            let lastYearMonth = '';
            let re = '';
            let widthNum = 0;
            let drawFirstFlg = true;
            // let beforeDate
            const baseWidthNum = 2;

            for (let n = 0; n < this.arrayDateMinBetweenMax.length; n++) {
                const currentDate = this.arrayDateMinBetweenMax[n];
                const date = parse(currentDate, 'yyyy-MM-dd', new Date());
                const currentYearMonth = `${getYear(date)}年${getMonth(date) + 1}月`;
                
                if (n == 0) {
                    lastYearMonth = currentYearMonth;
                }
                
                // widthNum++;

                if (currentYearMonth != lastYearMonth) {
                    if (drawFirstFlg) {
                        re += `<div class="border-2 border-gray-200" style="width: ${widthNum * baseWidthNum}rem; flex-shrink: 0;"><div class="m-2">${lastYearMonth}</div></div>`;
                        drawFirstFlg = !drawFirstFlg;
                    }
                    else {
                        re += `<div class="border-y-2 border-r-2 border-gray-200" style="width: ${widthNum * baseWidthNum}rem; flex-shrink: 0;"><div class="m-2">${lastYearMonth}</div></div>`;
                    }
                    widthNum = 0;
                }

                lastYearMonth = currentYearMonth;
                widthNum++;

                if (n == (this.arrayDateMinBetweenMax.length - 1)) {
                    re += `<div class="border-y-2 border-r-2 border-gray-200" style="width: ${widthNum * baseWidthNum}rem; flex-shrink: 0;"><div class="m-2">${lastYearMonth}</div></div>`;
                }
            }
            
            return re;
        },
        drawDay() {
            let re = '';
            const baseWidthNum = 2;

            re += `<div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center" style="width: 6rem; flex-shrink: 0;"><span>${this.productInformations.columnNames.control_no}</span></div>`;
            re += `<div class="border-b-2 border-gray-200 flex items-center justify-center" style="width: 8rem; flex-shrink: 0;"><span>${this.productInformations.columnNames.machine_code}</span></div>`;
            
            for (let n = 0; n < this.arrayDateMinBetweenMax.length; n++) {
                const currentDate = this.arrayDateMinBetweenMax[n];
                const date = parse(currentDate, 'yyyy-MM-dd', new Date());
                const currentDay = getDate(date);
                
                if (n == 0) {
                    re += `<div class="border-b-2 border-x-2 border-gray-200 flex items-center justify-center" style="width: ${baseWidthNum}rem; flex-shrink: 0;"><span>${currentDay}</span></div>`;
                }
                else {
                    re += `<div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center" style="width: ${baseWidthNum}rem; flex-shrink: 0;"><span>${currentDay}</span></div>`;
                }
            }
            
            return re;
        },
        drawPlan() {
            let re = '';
            const baseWidthNum = 2;
            
            for (let row of this.productInformations.data) {
                const orderDateNum = parse(row.order_date, 'yyyy/MM/dd', new Date());
                const planedDateDrawMachineNum = parse(row.planed_date_draw_machine, 'yyyy/MM/dd', new Date());
                const planedDateDrawElectricNum = parse(row.planed_date_draw_electric, 'yyyy/MM/dd', new Date());
                const planedFinishDateBuyNum = parse(row.planed_date_buy, 'yyyy/MM/dd', new Date());
                const planedDateSupplyNum = parse(row.planed_date_supply, 'yyyy/MM/dd', new Date());
                const planedDateAssembleStartNum = parse(row.planed_date_assemble_start, 'yyyy/MM/dd', new Date());
                const planedDateAssembleEndtNum = parse(row.planed_date_assemble_end, 'yyyy/MM/dd', new Date());
                const planedDeliveryDateNum = parse(row.planed_delivery_date, 'yyyy/MM/dd', new Date());
                const planedStartDateBuyNum = (() => {
                    if (!isValid(planedFinishDateBuyNum)) return planedFinishDateBuyNum;
                    if (isValid(planedDateDrawMachineNum) && isValid(planedDateDrawElectricNum)) {
                        if (isBefore(planedDateDrawMachineNum, planedDateDrawElectricNum)) {
                            return planedDateDrawMachineNum;
                        }
                        else {
                            return planedDateDrawElectricNum;
                        }
                    }
                    if (isValid(planedDateDrawMachineNum)) return planedDateDrawMachineNum;
                    if (isValid(planedDateDrawElectricNum)) return planedDateDrawElectricNum;
                    if (isValid(orderDateNum)) return orderDateNum;
                })();
                
                // console.log(planedStartDateBuyNum);

                re += '<div class="flex flex-row" style="height: 4rem;">';
                re += `<div class="flex items-center justify-center border-r-2 border-b-2 border-gray-200" style="width: 6rem; flex-shrink: 0;">${row.control_no}</div>`;
                re += `<div class="flex items-center justify-center border-b-2 border-gray-200" style="width: 8rem; flex-shrink: 0;">${row.machine_code}</div>`;
                
                for (let currentDate of this.arrayDateMinBetweenMax) {
                    const currentDateNum = parse(currentDate, 'yyyy-MM-dd', new Date());
                    const orderDateFlg = isEqual(currentDateNum, orderDateNum);
                    const planedDateDrawMachineFlg = isEqual(currentDateNum, planedDateDrawMachineNum);
                    const planedDateDrawElectricFlg = isEqual(currentDateNum, planedDateDrawElectricNum);
                    const planedDateBuyEndFlg = isEqual(currentDateNum, planedFinishDateBuyNum);
                    const planedDateBuySartFlg = isEqual(currentDateNum, planedStartDateBuyNum);
                    const planedDateBuyWithinFlg = isValid(planedStartDateBuyNum) && isValid(planedFinishDateBuyNum) && isWithinInterval(currentDateNum, {start: planedStartDateBuyNum, end: planedFinishDateBuyNum})? true: false;
                    const planedDateAssembleStartFlg = isEqual(currentDateNum, planedDateAssembleStartNum);
                    const planedDateAssembleEndFlg = isEqual(currentDateNum, planedDateAssembleEndtNum);
                    const planedDateAssembleWithinFlg = isValid(planedDateAssembleStartNum) && isValid(planedDateAssembleEndtNum) && isWithinInterval(currentDateNum, {start: planedDateAssembleStartNum, end: planedDateAssembleEndtNum})? true: false;
                    const planedDateSupplyFlg = isEqual(currentDateNum, planedDateSupplyNum);
                    const planedDeliveryDateFlg = isEqual(currentDateNum, planedDeliveryDateNum);

                    // console.log(planedDateBuySartFlg);

                    let svgHtml = '';

                    // 当該日付が受注日から出荷予定日の間であればセルを塗る
                    if (currentDateNum >= orderDateNum && currentDateNum <= planedDeliveryDateNum) {
                        re += `<div id="${row.control_no}@${currentDate}" class="flex items-center border-b-2 border-gray-200 bg-yellow-100" style="width: ${baseWidthNum}rem; flex-shrink: 0;">`;

                        // 受注日
                        if (orderDateFlg) svgHtml += `<path d="M0 0 L0 64" stroke-width="8" class="stroke-blue-500" />`;
                        // 機械出図予定日
                        if (planedDateDrawMachineFlg) svgHtml += `<path d="M4 8 L28 8" stroke-width="8" stroke-linecap="round" class="stroke-cyan-500" />`;
                        // 電気出図予定日
                        if (planedDateDrawElectricFlg) svgHtml += `<path d="M4 16 L28 16" stroke-width="8" stroke-linecap="round" class="stroke-emerald-500" />`;
                        
                        // 手配開始予定日であり手配完了予定日
                        if (planedDateBuySartFlg && planedDateBuyEndFlg) svgHtml += `<path d="M4 24 L28 24" stroke-width="8" stroke-linecap="round" class="stroke-lime-500" />`;
                        // 手配開始予定日
                        else if (planedDateBuySartFlg) svgHtml += `<path d="M4 24 L14 24" stroke-width="8" stroke-linecap="round" class="stroke-lime-500" /><path d="M14 24 L32 24" stroke-width="8" stroke-linecap="butt" class="stroke-lime-500" />`;
                        // 手配完了予定日
                        else if (planedDateBuyEndFlg) svgHtml += `<path d="M0 24 L14 24" stroke-width="8" stroke-linecap="butt" class="stroke-lime-500" /><path d="M14 24 L28 24" stroke-width="8" stroke-linecap="round" class="stroke-lime-500" />`;
                        // 手配期間
                        else if (planedDateBuyWithinFlg) svgHtml += `<path d="M0 24 L32 24" stroke-width="8" stroke-linecap="butt" class="stroke-lime-500" />`;

                        // 支給予定日
                        if (planedDateSupplyFlg) svgHtml += `<path d="M4 32 L28 32" stroke-width="8" stroke-linecap="round" class="stroke-orange-200" />`;

                        // 組立開始予定日であり組立完了予定日
                        if (planedDateAssembleStartFlg && planedDateAssembleEndFlg) svgHtml += `<path d="M4 32 L28 32" stroke-width="8" stroke-linecap="round" class="stroke-yellow-500" />`;
                        // 組立開始予定日
                        else if (planedDateAssembleStartFlg) svgHtml += `<path d="M4 32 L14 32" stroke-width="8" stroke-linecap="round" class="stroke-yellow-500" /><path d="M14 32 L32 32" stroke-width="8" stroke-linecap="butt" class="stroke-yellow-500" />`;
                        // 組立完了予定日
                        else if (planedDateAssembleEndFlg) svgHtml += `<path d="M0 32 L14 32" stroke-width="8" stroke-linecap="butt" class="stroke-yellow-500" /><path d="M14 32 L28 32" stroke-width="8" stroke-linecap="round" class="stroke-yellow-500" />`;
                        // 組立期間
                        else if (planedDateAssembleWithinFlg) svgHtml += `<path d="M0 32 L32 32" stroke-width="8" stroke-linecap="butt" class="stroke-yellow-500" />`;

                        // 出荷予定日
                        if (planedDeliveryDateFlg) svgHtml += `<path d="M32 0 L32 64" stroke-width="8" class="stroke-orange-500" />`;
                            
                        if (svgHtml) re += `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="64" viewBox="0 0 32 64">${svgHtml}</svg>`;
                    }
                    else {
                        re += `<div id="${row.control_no}@${currentDate}" class="flex items-center border-b-2 border-gray-200" style="width: ${baseWidthNum}rem; flex-shrink: 0;">`;
                    }
                    
                    re += `</div>`;

                }
                re += '</div>';
                // console.log(row.order_date);
            }
            
            return re;
        },
    },
    computed: {
        arrayDateMinBetweenMax() {
            return this.$parent.countDateMinBetweenMax();
        },
        arrayMonthMinBetweenMax() {
            const dateArray =  this.$parent.countDateMinBetweenMax();
        },
    },
};