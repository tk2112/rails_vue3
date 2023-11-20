export const ShowshowGanttChartButton = {
    inject: [
        'button',
    ],
    props: [
        'showGanttChart',
    ],
    template: `
    <button @click="changeStateGanttChart" class="w-44" :class="stylesShowGanttChart">{{ getStateShowGanttChart() }}</button>
    `,
    data() {
        return {

        }
    },
    created: function(){
        
    },
    mounted : function(){
        
    },
    methods: {
        changeStateGanttChart() {
            this.$emit('changeStateGanttChartClicked');
        },
        getStateShowGanttChart() {
            return this.showGanttChart? '出荷情報一覧を開く': 'ガントチャートを開く';
        },
    },
    computed: {
        stylesShowGanttChart() {
            if (this.showGanttChart) {
                return this.button.procClass;
            }
            else {
                return this.button.middleClass;
            }
        },
    },
};