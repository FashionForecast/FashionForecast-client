const xlsx = require('xlsx');
const fs = require('fs');

/**
 * 파일 생성 명령어: pnpm region
 *
 * 위경도 엑셀 파일은 아래 링크의 참고 문서에서 가져왔습니다.
 * script 폴더에 '위경도.xlsx' 파일을 넣어주세요.
 * @link https://www.data.go.kr/data/15084084/openapi.do
 */

const workbook = xlsx.readFile('./script/위경도.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

console.log('엑셀 데이터 변환중...');

const data = xlsx.utils.sheet_to_json(sheet);
const regions = [];

for (const v of data) {
  if (!v['2단계'] || v['3단계']) continue;

  const obj = {
    region: `${v['1단계']} ${v['2단계']}`,
    nx: v['경도(시)'],
    ny: v['위도(시)'],
  };

  regions.push(obj);
}

console.log('region.json 파일 생성중...');

const json = JSON.stringify(regions, null, 2);

fs.writeFile('./src/assets/region.json', json, 'utf-8', (err) => {
  if (err) {
    console.error('파일 생성 중 오류 발생: ', err);
    return;
  }

  console.log('region.json 파일이 생성되었습니다.');
});
