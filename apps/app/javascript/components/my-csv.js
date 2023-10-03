import Encoding from "encoding"; // https://github.com/polygonplanet/encoding.js/blob/master/README_ja.md

export default {
    test() {
        console.log(1);
    },
    readFile(file) {
        if (!file) return
        
        const reader = new FileReader();

        reader.onload = (e) => { // コールバック関数設定、ファイル読み込みが完了すると非同期に呼び出される
            const codes = new Uint8Array(e.target.result); // アップロードファイルをバイナリデータの配列に変換
            const detectedEncoding = Encoding.detect(codes); // 文字コード判定

            if (detectedEncoding == 'SJIS') {
                const csvData = this.parseSJIScsv(e.target.result);
                console.log(csvData);
            }
            else if (detectedEncoding == 'UTF8') {
                const csvData = this.parseUTF8csv(e.target.result);
            }
            console.log(detectedEncoding);
        };

        reader.readAsArrayBuffer(file); // ファイル読み込み開始
    },
    parseSJIScsv(bin) {
        const decoder = new TextDecoder('shift_jis');
        const csvText = decoder.decode(bin);
        const lines = csvText.split('\n');
        const headers = lines[0].split(',');
        const data = [];
    
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length === headers.length) {
            const row = {};
            for (let j = 0; j < headers.length; j++) {
                row[headers[j]] = values[j];
            }
            data.push(row);
            }
        }
    
        return data;
    },
    parseUTF8csv(bin) {
        console.log(bin);
    },
}