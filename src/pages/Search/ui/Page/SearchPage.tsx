import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  CurrentRegionButton,
  RecentSearchList,
  SearchLocationState,
} from '@/features/search';
import { registerResentSearch } from '@/features/search/api/search';

import { geolocationActions } from '@/entities/geolocation/model/slice';
import { setMemberDefaultRegion, storeMember } from '@/entities/member';
import { RegionItem } from '@/entities/search';

import { MY_REGION } from '@/shared/consts';
import regionList from '@/shared/consts/regionList.json';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { useSnackbar } from '@/shared/lib/useSnackbar';
import { Region } from '@/shared/types/region';
import { HeadHelmet } from '@/shared/ui';

import SearchHeader from '../../SearchHeader/SearchHeader';

import { C, S } from './SearchPage.style';

export const SearchPage = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.member.info);
  const [keyword, setKeyword] = useState('');

  const dispatch = useAppDispatch();
  const { state }: SearchLocationState = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const snackbar = useSnackbar();

  const { mutate: recentSearchMutate } = useMutation({
    mutationFn: (region: string) =>
      registerResentSearch(region, user?.socialId, accessToken),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['recentSearch'] }),
  });

  const { mutate: userRegionMutate } = useMutation({
    mutationFn: (region: string) => setMemberDefaultRegion(region, accessToken),
  });

  const matchItems = keyword
    ? regionList.filter((v) =>
        v.region.split(' ').some((v) => v.startsWith(keyword))
      )
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordResetClick = () => {
    setKeyword('');
  };

  const handleRegionClick = (regionData: Region) => {
    if (state?.mode === 'set') {
      updatePersonalRegionSetting(regionData);
      return;
    }

    setCurrntRegionUpdate(regionData);
  };

  const setCurrntRegionUpdate = (regionData: Region) => {
    if (!user) {
      localStorage.setItem(MY_REGION, JSON.stringify(regionData));
    }

    dispatch(geolocationActions.updateGeolocation(regionData));

    recentSearchMutate(regionData.region, {
      onSuccess: () => navigate('/'),
    });
  };

  const updatePersonalRegionSetting = (regionData: Region) => {
    recentSearchMutate(regionData.region);
    userRegionMutate(regionData.region, {
      onSuccess: async () => {
        dispatch(geolocationActions.updateGeolocation(regionData));
        await storeMember(accessToken, dispatch);
        navigate('/user?tab=set');
      },
      onError: () => snackbar.open('위치 설정 변경에 오류가 발생했어요'),
    });
  };

  return (
    <>
      <HeadHelmet
        title='위치 설정'
        description='위치를 설정하여 추천 옷차림과 날씨를 확인해보세요.'
        urlPath='/search'
      />

      <S.SearchWrapper>
        <SearchHeader
          keyword={keyword}
          onInputChange={handleInputChange}
          onKeywordResetClick={handleKeywordResetClick}
        />

        <CurrentRegionButton />

        {!keyword && (
          <RecentSearchList
            regions={regionList}
            handleRegionClick={handleRegionClick}
          />
        )}

        <C.RegionList>
          {matchItems.map((item) => (
            <RegionItem
              key={item.region}
              keyword={keyword}
              handleRegionClick={handleRegionClick}
              {...item}
            />
          ))}
        </C.RegionList>
      </S.SearchWrapper>
    </>
  );
};
