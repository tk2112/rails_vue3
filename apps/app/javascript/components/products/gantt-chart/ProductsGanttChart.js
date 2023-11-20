import { parse, format, getDate, getMonth, getYear, getDay, isBefore, isAfter, isEqual, isWithinInterval, isValid, eachDayOfInterval, sub } from 'date-fns';

class YearMonthClass {
    constructor(firstDate, lastDate) {
        try {
            if (getYear(firstDate) != getYear(lastDate) || getMonth(firstDate) != getMonth(lastDate)) throw new Error('引数Dateオブジェクトの年と月が一致しません');

            this._yearMonthStr = `${getYear(firstDate)}年${getMonth(firstDate) + 1}月`;
            this._daysHash = {};
            
            const dates = eachDayOfInterval({ start: firstDate, end: lastDate})

            for (const date of dates) {
                this._daysHash[format(date, 'yyyy-MM-dd')] = getDate(date);
            }
        } catch(e) {
            console.error('ERROR: YearMonthClass: constructor: ', e.message );
        }
    }

    getYearMonthStr() {
        return this._yearMonthStr;
    }
    getDaysHash() {
        return this._daysHash;
    }
    getDaysLength() {
        return Object.keys(this._daysHash).length;
    }
}

export const ProductsGanttChart = {
    template: `
    <div class="flex flex-row" 
        :style="wholeWidth">
        
        <div class="sticky flex flex-col" 
            style="left: 0; flex-shrink: 0; z-index: 3;"
            :style="leftSidebarProductsWidth"
            v-html="drawLeftSidebarProducts()" />

        <div class="flex flex-col" >
            <div class="sticky flex flex-row" 
                style="top: 0; height: 5rem; flex-shrink: 0; z-index: 2;"
                :style="headerDateWidth" 
                v-html="drawHeaderDate()" />

            <div class="flex flex-col" 
                v-html="drawPlan()" />
        </div>
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
            yearMonth: [], // productInformationsに保持されている日付からclass YearMonthClassを保持
            baseWidthNum: 2,
            controlNoWidthNum: 6,
            machineCodeWidthNum: 8,
        }
    },
    created() {
        this.setYearMonth;
    },
    mounted() {

    },
    methods: {
        drawLeftSidebarProducts() {
            let re = '';
            
            re += `
                <div class="sticky flex flex-row bg-white" style="top: 0; height: 5rem;">
                    <div class="flex items-center justify-center border-b-2 border-r-2 border-gray-200" 
                        style="width: ${this.controlNoWidthNum}rem; flex-shrink: 0;">
                        ${this.productInformations.columnNames.control_no}
                    </div>
                    <div class="flex items-center justify-center border-b-2 border-gray-200" 
                        style="width: ${this.machineCodeWidthNum}rem; flex-shrink: 0;">
                        ${this.productInformations.columnNames.machine_code}
                    </div>
                </div>
            `;

            for (let row of this.productInformations.data) {
                re += `
                    <div class="flex flex-row bg-white" style="height: 4rem;">
                        <div class="flex items-center justify-center border-r-2 border-b-2 border-r-gray-200 border-b-gray-400" 
                            style="width: ${this.controlNoWidthNum}rem; flex-shrink: 0; ">
                            ${row.control_no}
                        </div>
                        <div class="flex items-center justify-center border-b-2 border-gray-400" 
                            style="width: ${this.machineCodeWidthNum}rem; flex-shrink: 0; ">
                            ${row.machine_code}
                        </div>
                    </div>
                `;
            }
            
            return re;
        },
        drawHeaderDate() {
            let re = '';
            let drawFirstFlg = true;

            for (const currentYearMonth of this.yearMonth) {
                const widthNum = currentYearMonth.getDaysLength();

                re += `<div class="flex flex-col" style="height: 5rem; z-index: 1;">`;

                if (drawFirstFlg) {
                    re += `
                        <div class="border-b-2 border-x-2 border-gray-200 bg-white flex items-center" 
                            style="height: 3rem; width: ${widthNum * this.baseWidthNum}rem; flex-shrink: 0;">
                            ${currentYearMonth.getYearMonthStr()}
                        </div>`;
                }
                else {
                    re += `
                        <div class="border-b-2 border-r-2 border-gray-200 bg-white flex items-center" 
                            style="height: 3rem; width: ${widthNum * this.baseWidthNum}rem; flex-shrink: 0;">
                            ${currentYearMonth.getYearMonthStr()}
                        </div>`;
                }

                re += `<div class="flex flex-row bg-white">`;

                for (const [currentFormattedDate, currentDay] of Object.entries(currentYearMonth.getDaysHash())) {
                    const bgColor = this.getDateColor(currentFormattedDate);

                    if (drawFirstFlg) {
                        re += `
                            <div class="border-b-2 border-x-2 border-gray-200 flex items-center justify-center ${bgColor}" 
                                style="height: 2rem; width: ${this.baseWidthNum}rem; flex-shrink: 0;">
                                ${currentDay}
                            </div>`;

                        drawFirstFlg = !drawFirstFlg;
                    }
                    else {
                        re += `
                            <div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center ${bgColor}" 
                                style="height: 2rem; width: ${this.baseWidthNum}rem; flex-shrink: 0;">
                                ${currentDay}
                            </div>`;
                    }
                }

                re += `</div>`;
                re += `</div>`;
            }

            return re;
        },
        drawPlan() {
            let re = '';

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

                re += '<div class="flex flex-row" style="height: 4rem;">';
                
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

                    let svgHtml = '';

                    // 当該日付が祝日または土日であればセルを塗るだけにする
                    if (currentDate in this.productInformations.dataInHoliday || this.productInformations.dataInSunday.includes(currentDate) || this.productInformations.dataInSaturday.includes(currentDate)) {
                        re += `
                            <div id="${row.control_no}@${currentDate}" 
                                class="flex items-center border-b-2 border-gray-400 ${this.getDateColor(currentDate)}" 
                                style="width: ${this.baseWidthNum}rem; 
                                flex-shrink: 0;">`;
                    }
                    // 当該日付が受注日から出荷予定日の間であればセルを塗る
                    else if (currentDateNum >= orderDateNum && currentDateNum <= planedDeliveryDateNum) {
                        re += `
                            <div id="${row.control_no}@${currentDate}" 
                                class="flex items-center border-b-2 border-gray-400 bg-yellow-100" 
                                style="width: ${this.baseWidthNum}rem; flex-shrink: 0;">`;

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
                        re += `
                            <div id="${row.control_no}@${currentDate}" 
                                class="flex items-center border-b-2 border-gray-400" 
                                style="width: ${this.baseWidthNum}rem; 
                                flex-shrink: 0;">`;
                    }
                    
                    re += `</div>`;

                }
                re += '</div>';
            }
            return re;
        },
        getDateColor(formattedDate) {
            // 日本の祝日
            if (formattedDate in this.productInformations.dataInHoliday) return 'bg-red-100';
            // 日曜日
            if (this.productInformations.dataInSunday.includes(formattedDate)) return 'bg-red-100';
            // 土曜日
            if (this.productInformations.dataInSaturday.includes(formattedDate)) return 'bg-blue-100';
            // 平日
            return 'bg-white';
        }
    },
    computed: {
        arrayDateMinBetweenMax() {
            return this.$parent.countDateMinBetweenMax();
        },
        arrayMonthMinBetweenMax() {
            const dateArray =  this.$parent.countDateMinBetweenMax();
        },
        setYearMonth() {
            let firstDate = '';
            
            for (const formattedCurrentDate of this.arrayDateMinBetweenMax) {
                const currentDate = parse(formattedCurrentDate, 'yyyy-MM-dd', new Date());

                if (!firstDate) firstDate = currentDate;

                if (getMonth(firstDate) != getMonth(currentDate) || formattedCurrentDate == this.productInformations.maxDate) {
                    const lastDate = formattedCurrentDate == this.productInformations.maxDate? currentDate: sub(currentDate, { days: 1 });

                    this.yearMonth.push(new YearMonthClass(firstDate, lastDate));

                    firstDate = currentDate;
                }
            }
        },
        leftSidebarProductsWidth() {
            return {
                width: this.controlNoWidthNum + this.machineCodeWidthNum + 'rem',
            };
        },
        headerDateWidth() {
            return {
                width: (this.baseWidthNum * this.arrayDateMinBetweenMax.length) + 'rem',
            };
        },
        wholeWidth() {
            return {
                width: (this.baseWidthNum * this.arrayDateMinBetweenMax.length) + this.controlNoWidthNum + this.machineCodeWidthNum + 'rem',
            };
        },
    },
};