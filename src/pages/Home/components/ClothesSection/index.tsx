import { getDefaultClothes, getUserLookbookByTemp } from '@/service/clothes';
import { WeatherResponseData, WeatherType } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';
import { C, S } from './style';
import { Outfits } from '@/types/clothes';
import { ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import RecommendClothesLoading from './loading';
import NetworkError from '@/components/NetworkError';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import AddIcon from '@/assets/svg/add.svg?react';
import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { getClothesImageJSX } from '@/utils/clothes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RecommendClothes from './RecommendClothes';

const COOL = 'COOL',
  NORMAL = 'NORMAL',
  WARM = 'WARM';

const Options = new Map([
  [COOL, COOL],
  [NORMAL, NORMAL],
  [WARM, WARM],
]);

export type TempCondition = typeof COOL | typeof NORMAL | typeof WARM;

export type ClothesForWeather = Pick<
  WeatherResponseData,
  'extremumTmp' | 'maxMinTmpDiff' | 'maximumPcp' | 'maximumPop'
>;

type ClothesSectionProps = {
  weather: ClothesForWeather;
};

const ClothesSection = ({ weather }: ClothesSectionProps) => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const user = useAppSelector((state) => state.user.info);
  const [searchParams] = useSearchParams();
  const tempParamOption = (searchParams.get('option') ??
    NORMAL) as TempCondition;
  const [tempCondition, setTempCondition] = useState<TempCondition>(
    Options.has(tempParamOption) ? tempParamOption : NORMAL
  );
  const [currentSlider, setCurrentSlider] = useState(0);
  const navigate = useNavigate();

  const weatherType = getWeatehrType(weather.extremumTmp);
  const {
    data: recommedClothes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['clothes', tempCondition, geolocation?.region, weather],
    queryFn: () => getDefaultClothes({ ...weather, tempCondition }),
  });

  const { data: lookbook } = useQuery({
    queryKey: ['user', user?.socialId, 'lookbook', weather, tempCondition],
    queryFn: () =>
      getUserLookbookByTemp(weather.extremumTmp, tempCondition, accessToken),
    enabled: !!user,
  });

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: 'snap',
    slides: {
      origin: 'center',
    },
    initial: searchParams.get('tab') === 'lookbook' ? 1 : 0,
    slideChanged(slider) {
      setCurrentSlider(slider.track.details.rel);
    },
    created() {
      setCurrentSlider(searchParams.get('tab') === 'lookbook' ? 1 : 0);
    },
  });

  const moveToSliderClick = (index: number) => () => {
    instanceRef.current?.moveToIdx(index);
  };

  const handleTempConditionChange = (
    _e: React.MouseEvent<HTMLElement>,
    condition: TempCondition
  ) => {
    if (!condition) return;
    setTempCondition(condition);
  };

  const handleLookbookItemClick = (outfit?: Outfits) => () => {
    let type = Number(weatherType);

    if (tempCondition === 'COOL') type = type - 1;
    else if (tempCondition === 'WARM') type = type + 1;

    navigate(`/user/lookbook/create?type=${type}`, {
      state: {
        outfit,
        referrer: `/?tab=lookbook&option=${tempCondition}`,
        tempOption: tempCondition,
      },
    });
  };

  if (isError) return <NetworkError handleRefetch={refetch} />;
  return (
    <S.Section>
      <S.TitleWrap>
        <h6>{LOOKBOOK_WEATHER_TYPE[weatherType].title}</h6>
        <span>{LOOKBOOK_WEATHER_TYPE[weatherType].subtitle}</span>
      </S.TitleWrap>

      <ul ref={sliderRef} className='keen-slider'>
        <S.SliderItem className='keen-slider__slide'>
          {isLoading && <RecommendClothesLoading />}

          {recommedClothes && <RecommendClothes clothes={recommedClothes} />}
        </S.SliderItem>

        {user && (
          <>
            <S.SliderItem className='keen-slider__slide'>
              <S.LookbookList>
                {lookbook?.map((outfit) => (
                  <S.LookbookCard
                    key={outfit.memberOutfitId}
                    onClick={handleLookbookItemClick(outfit)}
                  >
                    {getClothesImageJSX(outfit.topType, outfit.topColor)}
                    {getClothesImageJSX(outfit.bottomType, outfit.bottomColor)}
                  </S.LookbookCard>
                ))}

                {(!lookbook || lookbook.length <= 3) && (
                  <S.LookbookCard
                    $content='add'
                    onClick={handleLookbookItemClick()}
                  >
                    <AddIcon />
                    <span>추가하기</span>
                  </S.LookbookCard>
                )}
              </S.LookbookList>
            </S.SliderItem>

            {currentSlider === 1 && (
              <S.MoveButton onClick={moveToSliderClick(0)}>ITEMS</S.MoveButton>
            )}
            {currentSlider === 0 && (
              <S.MoveButton $position={'right'} onClick={moveToSliderClick(1)}>
                Lookbook
              </S.MoveButton>
            )}
          </>
        )}
      </ul>

      <S.ButtonWrap>
        <ToggleButtonGroup
          fullWidth
          exclusive
          value={tempCondition}
          onChange={handleTempConditionChange}
        >
          <C.ToggleButon value={COOL} disabled={weather.extremumTmp >= 28}>
            시원하게
          </C.ToggleButon>
          <C.ToggleButon value={NORMAL}>적당하게</C.ToggleButon>
          <C.ToggleButon value={WARM} disabled={weather.extremumTmp < 5}>
            따뜻하게
          </C.ToggleButon>
        </ToggleButtonGroup>
      </S.ButtonWrap>
    </S.Section>
  );
};

export default ClothesSection;

function getWeatehrType(temp: number): WeatherType {
  if (temp >= 28) return '1';
  if (temp >= 23 && temp < 28) return '2';
  if (temp >= 20 && temp < 23) return '3';
  if (temp >= 17 && temp < 20) return '4';
  if (temp >= 12 && temp < 17) return '5';
  if (temp >= 9 && temp < 12) return '6';
  if (temp >= 5 && temp < 9) return '7';
  return '8';
}
