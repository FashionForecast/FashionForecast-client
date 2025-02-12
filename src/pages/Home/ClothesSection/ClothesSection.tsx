import { getRecommnedClothes } from '@/services/clothes';
import { WeatherData, WeatherType } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';
import { S } from './ClothesSection.style';
import { memo, useCallback, useState } from 'react';
import { useAppSelector } from '@/shared/lib/useAppSelector';
import RecommendClothesLoading from './RecommendList/RecommendListLoading';
import NetworkError from '@/components/NetworkError/NetworkError';
import { useKeenSlider } from 'keen-slider/react';
import { useSearchParams } from 'react-router-dom';
import RecommendList from './RecommendList/RecommendList';
import LookbookList from './LookbookList/LookbookList';
import ConditionButtonGroup from './ConditionButtonGroup/ConditionButtonGroup';
import Headline from './Headline/Headline';

export const COOL = 'COOL',
  NORMAL = 'NORMAL',
  WARM = 'WARM';

const Options = new Map([
  [COOL, COOL],
  [NORMAL, NORMAL],
  [WARM, WARM],
]);

export type TempCondition = typeof COOL | typeof NORMAL | typeof WARM;

export type WeatherForRecommendClothes = Pick<
  WeatherData,
  'extremumTmp' | 'maxMinTmpDiff' | 'maximumPcp' | 'maximumPop'
>;

type ClothesSectionProps = {
  weather: WeatherForRecommendClothes;
};

const ClothesSection = ({ weather }: ClothesSectionProps) => {
  const geolocation = useAppSelector((state) => state.geolocation.value);
  const user = useAppSelector((state) => state.user.info);
  const [searchParams] = useSearchParams();
  const tempParamOption = searchParams.get('option');
  const [tempCondition, setTempCondition] = useState<TempCondition>(() =>
    initializeTempCondition(
      weather.extremumTmp,
      user?.tempCondition,
      tempParamOption
    )
  );
  const [currentSlider, setCurrentSlider] = useState(0);
  const [originType, changedType] = getWeatehrType(
    weather.extremumTmp,
    tempCondition
  );

  const {
    data: recommedClothes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['clothes', tempCondition, geolocation?.region, weather],
    queryFn: () => getRecommnedClothes({ ...weather, tempCondition }),
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

  const handleTempConditionChange = useCallback(
    (_e: React.MouseEvent<HTMLElement>, condition: TempCondition) => {
      if (!condition) return;
      setTempCondition(condition);
    },
    []
  );

  if (isError) return <NetworkError handleRefetch={refetch} />;
  return (
    <S.Section>
      <Headline weatherType={originType} />

      <ul ref={sliderRef} className='keen-slider'>
        <S.SliderItem className='keen-slider__slide'>
          {isLoading && <RecommendClothesLoading />}

          {recommedClothes && (
            <RecommendList
              clothes={recommedClothes}
              weatherType={changedType}
            />
          )}
        </S.SliderItem>

        {user && (
          <>
            <S.SliderItem className='keen-slider__slide'>
              <LookbookList
                weather={weather}
                weatherType={changedType}
                tempCondition={tempCondition}
              />
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

      <ConditionButtonGroup
        tempCondition={tempCondition}
        extremumTmp={weather.extremumTmp}
        handleTempConditionChange={handleTempConditionChange}
      />
    </S.Section>
  );
};

export default memo(ClothesSection);

function getWeatehrType(
  temp: number,
  tempCondition: TempCondition
): WeatherType[] {
  const types = [];
  let type = 8;

  if (temp >= 28) type = 1;
  if (temp >= 23 && temp < 28) type = 2;
  if (temp >= 20 && temp < 23) type = 3;
  if (temp >= 17 && temp < 20) type = 4;
  if (temp >= 12 && temp < 17) type = 5;
  if (temp >= 9 && temp < 12) type = 6;
  if (temp >= 5 && temp < 9) type = 7;

  types.push(String(type));

  if (tempCondition === 'COOL') type = type - 1;
  else if (tempCondition === 'WARM') type = type + 1;

  types.push(String(type));
  return types as WeatherType[];
}

function initializeTempCondition(
  extremumTmp: number,
  userTempCondition?: TempCondition,
  tempParamOption?: TempCondition | string | null
): TempCondition {
  const tempCondition = tempParamOption ? tempParamOption : userTempCondition;

  if (!isValidTempCondition(extremumTmp, tempCondition)) return 'NORMAL';
  return tempCondition ? (tempCondition as TempCondition) : 'NORMAL';
}

function isValidTempCondition(
  extremumTmp: number,
  tempCondition?: TempCondition | string
) {
  if (tempCondition && !Options.has(tempCondition)) return false;

  if (
    (extremumTmp < 5 && tempCondition === 'WARM') ||
    (extremumTmp >= 28 && tempCondition === 'COOL')
  )
    return false;

  return true;
}
