export const SelectWithinIntervalGanttChartButton = {
    template: `
    <div class="flex flex-row items-stretch justify-center text-gray-900 bg-white border border-gray-400 rounded-lg ">
        <h3 class="font-semibold border-r border-gray-400 bg-gray-200 px-4 py-3 rounded-l-lg">月単位選択</h3>
        <ul class="flex flex-row items-stretch justify-center text-sm font-medium">
            <li class="my-1 inline-block w-40">
                <div class="flex items-center px-3 py-2">
                    <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                    <label for="horizontal-list-radio-license" class="flex justify-center w-full text-sm font-medium">1ケ月</label>
                </div>
            </li>
            <li class="my-1 inline-block w-40 border-x border-gray-400">
                <div class="flex items-center px-3 py-2">
                    <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" class="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                    <label for="horizontal-list-radio-id" class="flex justify-center w-full text-sm font-medium">3ケ月</label>
                </div>
            </li>
            <li class="my-1 inline-block w-40">
                <div class="flex items-center px-3 py-2">
                    <input id="horizontal-list-radio-millitary" type="radio" value="" name="list-radio" class="text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                    <label for="horizontal-list-radio-millitary" class="flex justify-center w-full text-sm font-medium">6ケ月</label>
                </div>
            </li>
        </ul>
    </div>
    `,
};