import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import useA2HS from '@/app/model/useA2HS';

import { PageFallback } from '@/widgets/PageFallback';

import { guestLogin, storeAccessToken } from '@/entities/auth';
import { storeMember } from '@/entities/member';
import { DEFAULT_REGION } from '@/entities/region';
import { regionActions } from '@/entities/region/model/slice';

import { GUEST_UUID, LOGIN, REGION } from '@/shared/consts';
import regionList from '@/shared/consts/regionList.json';
import { useAppDispatch } from '@/shared/lib/useAppDispatch';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import { Button, Snackbar } from '@/shared/ui';

import * as S from './BaseLayout.style';

export const BaseLayout = () => {
  const member = useAppSelector((state) => state.member.info);
  const { geolocation, geolocationStatus } = useAppSelector(
    (state) => state.region
  );
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { deferredPrompt, installApp } = useA2HS();

  const { mutate: mutateGuestLogin } = useMutation({
    mutationFn: guestLogin,
    onSuccess: (guest) => localStorage.setItem(GUEST_UUID, guest.uuid),
  });

  /** 게스트(비회원)의 uuid 저장 */
  useEffect(() => {
    const uuidGuest = localStorage.getItem(GUEST_UUID);

    if (!uuidGuest) {
      mutateGuestLogin();
    }
  }, [mutateGuestLogin]);

  /** 자동 로그인 처리 */
  useEffect(() => {
    async function handleAutoLogin() {
      try {
        const accessToken = await storeAccessToken(dispatch);
        await storeMember(accessToken, dispatch);
      } catch {
        navigate('/login');
      } finally {
        setIsLoggingIn(false);
      }
    }

    const isPrevLoggedIn = localStorage.getItem(LOGIN);

    if (isPrevLoggedIn) {
      handleAutoLogin();
      return;
    }

    setIsLoggingIn(false);
  }, []);

  /** 성별이 설정되어 있지 않으면, 성별 설정 페이지로 이동 */
  useEffect(() => {
    if (member && !member.gender) {
      navigate('/user/gender');
    }
  }, [pathname, member?.gender]);

  /** GPS 이용 가능 상태 및 GPS 상 가장 가까운 지역 정보를 업데이트 */
  useEffect(() => {
    const gpsSuccess = (position: GeolocationPosition) => {
      const { closestRegion, nx, ny } = getClosestRegion(position);

      dispatch(regionActions.updateStatus('success'));
      dispatch(
        regionActions.updateGeolocation({
          region: closestRegion,
          nx,
          ny,
          isGPS: true,
        })
      );
    };

    const gpsError = () => {
      dispatch(regionActions.updateStatus('error'));
    };

    if (!navigator.geolocation) {
      gpsError();
      return;
    }

    navigator.geolocation.getCurrentPosition(gpsSuccess, gpsError, {
      enableHighAccuracy: true,
    });
  }, []);

  /**
   * - 사용자가 이전에 설정한 지역으로 업데이트
   * - 이전에 설정한 값이 없으면 default region으로 업데이트
   */
  useEffect(() => {
    if (geolocationStatus === 'pending') return;

    if (!member) {
      const localStorageRegionName = localStorage.getItem(REGION);

      if (!localStorageRegionName && geolocation) {
        dispatch(regionActions.updateSelectedRegion(geolocation));
        return;
      }

      const region = findRegionByName(localStorageRegionName);
      dispatch(regionActions.updateSelectedRegion(region));

      return;
    }

    const memberRegionName = member.region;
    if (memberRegionName === 'DEFAULT' && geolocation) {
      dispatch(regionActions.updateSelectedRegion(geolocation));
      return;
    }

    const region = findRegionByName(memberRegionName);

    dispatch(regionActions.updateSelectedRegion(region));
  }, [member?.socialId, member?.region, geolocation, geolocationStatus]);

  if (isLoggingIn) return <PageFallback />;
  return (
    <S.Main>
      <Outlet />
      {deferredPrompt && (
        <Snackbar
          open={true}
          message='홈화면에 바로가기를 추가할 수 있어요!'
          bottomPosition={106}
          action={<Button onClick={installApp}>추가</Button>}
        />
      )}
    </S.Main>
  );
};

/** 사용자의 위치를 기준으로 가장 가까운 지역을 찾는 함수 */
function getClosestRegion(position: GeolocationPosition) {
  let closestRegion = '';
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nx = 0;
  let ny = 0;

  regionList.forEach((region) => {
    const distance = calculateDistance(
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

/** 위도, 경도를 이용해 두 지점 간의 거리를 계산 (Haversine formula) */
function calculateDistance(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
) {
  const EARTH_RADIUS_KM = 6371;
  const deltaLat = ((latitude2 - latitude1) * Math.PI) / 180;
  const deltaLon = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos((latitude1 * Math.PI) / 180) *
      Math.cos((latitude2 * Math.PI) / 180) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

function findRegionByName(regionName: string | null) {
  if (!regionName) return DEFAULT_REGION;

  return (
    regionList.find((region) => region.region === regionName) ?? DEFAULT_REGION
  );
}
