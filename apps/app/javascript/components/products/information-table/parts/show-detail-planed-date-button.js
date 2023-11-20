export const ShowDetailPlanedDateButton = {
    inject: [
        'button',
    ],
    props: [
        'showDetailPlanedDate',
    ],
    template: `
    <button @click="changeStateShowDetailPlanedDate" class="w-44" :class="stylesShowDetailPlanedDate">{{ getStateShowDetailPlanedDateName() }}</button>
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
        changeStateShowDetailPlanedDate() {
            this.$emit('changeStateShowDetailPlanedDateClicked');
        },
        getStateShowDetailPlanedDateName() {
            return this.showDetailPlanedDate? '各予定日を閉じる': '各予定日を開く';
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
    },
};