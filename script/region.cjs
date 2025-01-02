const xlsx = require('xlsx');
const fs = require('fs');

/**
 * 파일 생성 명령어: pnpm region
 * 지역 위경도 파일 생성 스크립트
 */

const workbook = xlsx.readFile('./script/위경도.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const data = xlsx.utils.sheet_to_json(sheet);
const regionList = [];
const regionCoordinateList = {};

for (const v of data) {
  let regionName = `${v['city']} ${v['district']}`;

  if (v['neighborhood'] !== 'NONE') {
    regionName = `${regionName} ${v['neighborhood']}`;
  }

  // regionList.json 파일 데이터
  regionList.push({
    region: regionName,
    nx: Number(v['latitude']),
    ny: Number(v['longitude']),
  });

  // regionCoordinateList.ts 파일 데이터
  regionCoordinateList[regionName] = {
    nx: Number(v['latitude']),
    ny: Number(v['longitude']),
  };
}

console.log('regionList.json 파일 생성중...');

const regionListFile = JSON.stringify(regionList, null, 2);

fs.writeFile('./src/assets/regionList.json', regionListFile, 'utf-8', (err) => {
  if (err) {
    console.error('파일 생성 중 오류 발생: ', err);
    return;
  }

  console.log('regionList.json 파일이 생성되었습니다.');
});

console.log('regionCoordinateList.ts 파일 생성중...');

const listJson = JSON.stringify(regionCoordinateList, null, 2);
const listContent = `const regionCoordinateList: Record<
  string,
  { nx: number; ny: number }
> = ${listJson}\n export default regionCoordinateList`;

fs.writeFile(
  './src/assets/regionCoordinateList.ts',
  listContent,
  'utf-8',
  (err) => {
    if (err) {
      console.error('파일 생성 중 오류 발생: ', err);
      return;
    }

    console.log('regionCoordinateList.ts 파일이 생성되었습니다.');
  }
);
