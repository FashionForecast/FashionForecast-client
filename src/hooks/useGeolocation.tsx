import regions from '@/assets/actualRegionCoordinates.json';
import useAppSelector from './useAppSelector';
import useAppDispatch from './useAppDispatch';
import { goelocationActions } from '@/redux/slice/geolocationSlice';

const DEFAULT_REGION = {
  region: '서울특별시 종로구',
  nx: 37,
  ny: 126,
};

/** 사용자의 위치를 설정하는 hook */
const useGeolocation = () => {
  const { value, status } = useAppSelector((state) => state.geolocation);
  const dispatch = useAppDispatch();

  const { updateGeolocation, updateStatus } = goelocationActions;

  const updateDefaultRegion = () => dispatch(updateGeolocation(DEFAULT_REGION));
  const updateGPSRegion = () => {
    const gpsSuccess = (position: GeolocationPosition) => {
      const { closestRegion, nx, ny } = getClosestRegion(position);
      dispatch(updateStatus('available'));
      dispatch(
        updateGeolocation({
          region: closestRegion,
          nx,
          ny,
          isGPS: true,
        })
      );
    };

    const gpsError = () => {
      dispatch(updateStatus('error'));
      dispatch(updateGeolocation(DEFAULT_REGION));
    };

    navigator.geolocation.getCurrentPosition(gpsSuccess, gpsError, {
      enableHighAccuracy: true,
    });
  };

  return {
    geolocation: value,
    status,
    updateDefaultRegion,
    updateGPSRegion,
    updateStatus,
  };
};

export default useGeolocation;

/** 사용자의 위치를 특정하는 함수 */
function getClosestRegion(position: GeolocationPosition) {
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

  return { closestRegion, nx, ny };
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
