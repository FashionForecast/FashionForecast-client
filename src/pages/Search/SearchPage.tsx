import { useState } from 'react';
import regions from '@/assets/actualRegionCoordinates.json';
import RegionItem from './components/RegionItem/RegionItem';
import { C, S } from './SearchPage.style';
import SearchHeader from './SearchHeader/SearchHeader';
import RecentSearchList from './RecentSearchList/RecentSearchList';
import CurrentRegionButton, {
  SearchLocationState,
} from './CurrentRegionButton/CurrentRegionButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from '@/contexts/SnackbarProvider';
import { registerSearchWord } from '@/services/search';
import { setUserRegion } from '@/services/auth';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { Region } from '@/types/region';
import { MY_REGION } from '@/constants/localStorageKey';
import { goelocationActions } from '@/store/slice/geolocationSlice';
import { storeUser } from '@/utils/auth';
import HeadHelmet from '@/components/HeadHelmet';

const SearchPage = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.info);
  const [keyword, setKeyword] = useState('');

  const dispatch = useAppDispatch();
  const { state }: SearchLocationState = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openSnackbar } = useSnackbar();

  const { mutate: recentSearchMutate } = useMutation({
    mutationFn: (region: string) =>
      registerSearchWord(region, user?.socialId, accessToken),
    onSuccess: async () =>
      await queryClient.invalidateQueries({ queryKey: ['recentSearch'] }),
  });

  const { mutate: userRegionMutate } = useMutation({
    mutationFn: (region: string) => setUserRegion(region, accessToken),
  });

  const matchItems = keyword
    ? regions.filter((v) =>
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

    dispatch(goelocationActions.updateGeolocation(regionData));

    recentSearchMutate(regionData.region, {
      onSuccess: () => navigate('/'),
    });
  };

  const updatePersonalRegionSetting = (regionData: Region) => {
    recentSearchMutate(regionData.region);
    userRegionMutate(regionData.region, {
      onSuccess: async () => {
        dispatch(goelocationActions.updateGeolocation(regionData));
        await storeUser(accessToken, dispatch);
        navigate('/user?tab=set');
      },
      onError: () => openSnackbar('위치 설정 변경에 오류가 발생했어요'),
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
            regions={regions}
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

export default SearchPage;
