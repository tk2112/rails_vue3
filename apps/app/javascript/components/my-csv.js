import Encoding from "encoding"; // https://github.com/polygonplanet/encoding.js/blob/master/README_ja.md

export default {
    readFile(file) {
        const me = this;

        return new Promise(function(resolve, reject){
            if (!file) return
            
            const reader = new FileReader();

            reader.onload = (e) => { // コールバック関数設定、ファイル読み込みが完了すると非同期に呼び出される
                const codes = new Uint8Array(e.target.result); // アップロードファイルをバイナリデータの配列に変換
                const detectedEncoding = Encoding.detect(codes); // 文字コード判定
                let decoder;
                
                if (detectedEncoding == 'SJIS') {
                    decoder = new TextDecoder('shift_jis');
                }
                else if (detectedEncoding == 'UTF8') {
                    decoder = new TextDecoder('utf-8');
                }

                const csvText = decoder.decode(e.target.result);
                const data = me.parseCsv(csvText);
                // console.log(data);
                
                resolve(data);
            };

            reader.readAsArrayBuffer(file); // ファイル読み込み開始
        })
    },
    parseCsv(csvText) {
        let beforeChar = '';
        let beforeProcName = '';
        let data = [];
        let row = [];
        let value = '';
        let flgPendingDoubleQuotation = false; // ダブルクォーテーションペンディングFLG: ON -> ダブルクォーテーション: 文字確定, カンマ: 新規文字列確定, 改行コード: 新規行確定

        const addChar = function(value, char) { return value += char; };
        const addValue = function(row, value) { row.push(value); return row; };
        const addRow = function(data, row) { data.push(row); return data; };

        // 引数文字列を1文字ずつ読み込み
        for (const char of csvText) {
            switch (char) {
                // ダブルクォーテーション
                case '"':
                    // 前回処理が文字加算だった場合、ダブルクォーテーションペンディングFLGをON
                    if (beforeProcName == addChar.name) {
                        flgPendingDoubleQuotation = true
                    }
                    // 前回文字: ダブルクォーテーション
                    else if (beforeChar == '"') {
                        if (flgPendingDoubleQuotation) {
                            // 新規文字: ダブルクォーテーション
                            value = addChar(value, char);
                            beforeProcName = addChar.name
                            flgPendingDoubleQuotation = false
                        }
                        else {
                            // ダブルクォーテーションペンディングFLGをON
                            flgPendingDoubleQuotation = true
                        }
                    }
                    break;
                // カンマ
                case ',':
                    // 前回文字: ダブルクォーテーション + ダブルクォーテーションペンディングFLG: ON
                    if (beforeChar == '"' && flgPendingDoubleQuotation) {
                        // カレント文字列を行に追加
                        row = addValue(row, value);
                        beforeProcName = addValue.name        
                        flgPendingDoubleQuotation = false;
                        value = '';
                    }
                    else {
                        // 新規文字: カンマ
                        value = addChar(value, char);
                        beforeProcName = addChar.name
                    }
                    break;
                // 改行コード
                case '\n':
                    // 前回文字: ダブルクォーテーション + ダブルクォーテーションペンディングFLG: ON
                    if (beforeChar == '"' && flgPendingDoubleQuotation) {
                        // カレント行を表に追加
                        row = addValue(row, value);
                        data = addRow(data, row);
                        beforeProcName = addRow.name        
                        flgPendingDoubleQuotation = false;
                        value = '';
                        row = [];
                    }
                    else {
                        // 新規文字: 改行コード
                        value = addChar(value, char);
                        beforeProcName = addChar.name
                    }
                    break;
                // 他ケースのいずれにも当てはまらない1文字
                default :
                    value = addChar(value, char);
                    beforeProcName = addChar.name
                    if (flgPendingDoubleQuotation) flgPendingDoubleQuotation = false;
            }
            beforeChar = char;
        }
        return data;
    },
}