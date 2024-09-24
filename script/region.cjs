const xlsx = require('xlsx');
const fs = require('fs');

/**
 * 파일 생성 명령어: pnpm region
 *
 * 위경도 엑셀 파일은 아래 링크의 참고 문서에서 가져왔습니다.
 * script 폴더에 '위경도.xlsx' 파일을 넣어주세요.
 * @link https://www.data.go.kr/data/15084084/openapi.do
 *
 * 기상청 좌표 파일은 아래 링크의 csv파일을 변환했습니다.
 * scrirpt 폴더에 '기상청좌표.xlsx' 파일을 넣어주세요.
 * @link https://github.com/FashionForecast/FashionForecast-server/blob/develop/src/main/resources/national_forecast_regions.csv
 */

const workbook = xlsx.readFile('./script/위경도.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

console.log('지역 실제 좌표 엑셀 데이터 변환중...');

const data = xlsx.utils.sheet_to_json(sheet);
const localCoordinates = [];

for (const v of data) {
  if (!v['2단계'] || v['3단계']) continue;

  const region = {
    region: `${v['1단계']} ${v['2단계']}`,
    nx: Number(v['위도(초/100)']),
    ny: Number(v['경도(초/100)']),
  };

  localCoordinates.push(region);
}

console.log('actualRegionCoordinates.json 파일 생성중...');

const regionJson = JSON.stringify(localCoordinates, null, 2);

fs.writeFile(
  './src/assets/actualRegionCoordinates.json',
  regionJson,
  'utf-8',
  (err) => {
    if (err) {
      console.error('파일 생성 중 오류 발생: ', err);
      return;
    }

    console.log('actualRegionCoordinates.json 파일이 생성되었습니다.');
  }
);

console.log('기상청 지역 좌표 엑셀 데이터 변환중...');

const weatherWorkbook = xlsx.readFile('./script/기상청좌표.xlsx');
const weatherSheetName = weatherWorkbook.SheetNames[0];
const weathersheet = weatherWorkbook.Sheets[weatherSheetName];

const weatherData = xlsx.utils.sheet_to_json(weathersheet);

const weatherCoordinateList = {};

for (const v of weatherData) {
  if (!v['district'] || v['neighborhood']) continue;

  weatherCoordinateList[`${v['city']} ${v['district']}`] = {
    weatherNx: v['nx'],
    weatherNy: v['ny'],
  };
}

localCoordinates.forEach((v) => {
  if (!weatherCoordinateList[v.region]) {
    throw Error(`${v.region}이 존재하지 않습니다. 확인해주세요.`);
  }
});

console.log('meteorologicalRegionCoordinates.ts 파일 생성중...');

const listJson = JSON.stringify(weatherCoordinateList, null, 2);
const listContent = `const weatherCoordinateList: Record<
  string,
  { weatherNx: number; weatherNy: number }
> = ${listJson}\n export default weatherCoordinateList`;

fs.writeFile(
  './src/assets/meteorologicalRegionCoordinates.ts',
  listContent,
  'utf-8',
  (err) => {
    if (err) {
      console.error('파일 생성 중 오류 발생: ', err);
      return;
    }

    console.log('meteorologicalRegionCoordinates.ts 파일이 생성되었습니다.');
  }
);
