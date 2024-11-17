import { getDefaultClothes } from '@/service/clothes';
import { WeatherResponseData, WeatherType } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';
import { S } from './style';
import { memo, useCallback, useEffect, useState } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import RecommendClothesLoading from './loading';
import NetworkError from '@/components/NetworkError';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useSearchParams } from 'react-router-dom';
import RecommendClothes from './RecommendClothes';
import LookbookClothes from './LookbookClothes';
import OptionButtons from './OptionButtons';
import Headline from './Headline';

export const COOL = 'COOL',
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
  const user = useAppSelector((state) => state.user.info);
  const [searchParams] = useSearchParams();
  const tempParamOption = searchParams.get('option');
  const weatherType = getWeatehrType(weather.extremumTmp);
  const [tempCondition, setTempCondition] = useState<TempCondition>(() =>
    initializeTempCondition(
      weather.extremumTmp,
      user?.tempCondition,
      tempParamOption
    )
  );
  const [currentSlider, setCurrentSlider] = useState(0);

  const {
    data: recommedClothes,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['clothes', tempCondition, geolocation?.region, weather],
    queryFn: () => getDefaultClothes({ ...weather, tempCondition }),
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

  useEffect(() => {
    setTempCondition(
      initializeTempCondition(weather.extremumTmp, user?.tempCondition)
    );
  }, [weather.extremumTmp, user?.tempCondition]);

  if (isError) return <NetworkError handleRefetch={refetch} />;
  return (
    <S.Section>
      <Headline weatherType={weatherType} />

      <ul ref={sliderRef} className='keen-slider'>
        <S.SliderItem className='keen-slider__slide'>
          {isLoading && <RecommendClothesLoading />}

          {recommedClothes && <RecommendClothes clothes={recommedClothes} />}
        </S.SliderItem>

        {user && (
          <>
            <S.SliderItem className='keen-slider__slide'>
              <LookbookClothes
                weather={weather}
                weatherType={weatherType}
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

      <OptionButtons
        tempCondition={tempCondition}
        extremumTmp={weather.extremumTmp}
        handleTempConditionChange={handleTempConditionChange}
      />
    </S.Section>
  );
};

export default memo(ClothesSection);

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

function initializeTempCondition(
  extremumTmp: number,
  userTempCondition?: TempCondition,
  tempParamOption?: string | null
): TempCondition {
  if (tempParamOption && Options.has(tempParamOption))
    return tempParamOption as TempCondition;

  if (!isValidTempCondition(extremumTmp, userTempCondition)) return 'NORMAL';

  return userTempCondition ? userTempCondition : 'NORMAL';
}

export function isValidTempCondition(
  extremumTmp: number,
  userTempCondition?: TempCondition
) {
  if (
    (extremumTmp < 5 && userTempCondition === 'WARM') ||
    (extremumTmp >= 28 && userTempCondition === 'COOL')
  )
    return false;

  return true;
}
