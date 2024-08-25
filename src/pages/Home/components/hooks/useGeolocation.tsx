import { Region } from '@/types/region';
import { useEffect, useState } from 'react';
import regions from '@/assets/region.json';

/** 사용자의 현재 위치를 설정하는 hook */
const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<null | Region>(null);
  const setUserGeolocation = (region: Region) => setGeolocation(region);

  //TODO: alert 및 console.log 제거
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => geolocationSuccess(position, setUserGeolocation),
        geolocationSuccessError,
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      alert('위치 권한을 사용할 수 없는 브라우저 입니다.');
    }
  }, []);

  return { geolocation };
};

export default useGeolocation;

/** 사용자의 위치를 특정하는 함수 */
function geolocationSuccess(
  position: GeolocationPosition,
  setUserGeolocation: (region: Region) => void
) {
  let closestRegion = '';
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nx = 0;
  let ny = 0;

  regions.forEach((region) => {
    const distance = getDistance(
      position.coords.latitude,
      position.coords.longitude,
      region.nx,
      region.ny
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestRegion = region.region;
      nx = region.nx;
      ny = region.ny;
    }
  });

  setUserGeolocation({ region: closestRegion, nx, ny });
}

/** geolocation 오류를 처리하는 함수 */
function geolocationSuccessError(error: GeolocationPositionError) {
  alert(`위치 권한이 거부되었거나 오류가 발생했습니다. [${error.code}]`);
  console.error('Error code:', error.code);
  console.error('Error message:', error.message);
}

/** 위도, 경도를 이용한 두 지점 사이의 거리 계산 함수 (Haversine formula) */
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // 지구의 반지름(km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}
