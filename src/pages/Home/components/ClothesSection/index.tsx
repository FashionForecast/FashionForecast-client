import { getDefaultClothes, getUserLookbookByTemp } from '@/service/clothes';
import { WeatherResponseData, WeatherType } from '@/types/weather';
import { useQuery } from '@tanstack/react-query';
import { C, S } from './style';
import { ClothesImageName, OutfitType } from '@/types/clothes';
import { Chip, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import useAppSelector from '@/hooks/useAppSelector';
import clothesImage from '@/constants/imageData/clothesImage';
import RecommendClothesLoading from './loading';
import NetworkError from '@/components/NetworkError';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import AddIcon from '@/assets/svg/add.svg?react';
import { LOOKBOOK_WEATHER_TYPE } from '@/constants/Lookbook/data';
import { getClothesImageJSX } from '@/utils/clothes';

const COOL = 'COOL',
  NORMAL = 'NORMAL',
  WARM = 'WARM';
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
  const [tempCondition, setTempCondition] = useState<TempCondition>(NORMAL);
  const [currentSlider, setCurrentSlider] = useState(0);
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
    slideChanged(slider) {
      setCurrentSlider(slider.track.details.rel);
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

          {recommedClothes?.map(({ names, outfitType }) => (
            <C.ClothesCard
              elevation={0}
              key={outfitType}
              $outfitType={outfitType}
            >
              <S.ImageWrap>
                {getClothesImage(outfitType, names as ClothesImageName[])}
              </S.ImageWrap>
              <div>
                <h4>{outFitName[outfitType]}</h4>
                <S.ChipWrapper>
                  {names.map((name) => (
                    <Chip key={name} label={name} size='small' />
                  ))}
                </S.ChipWrapper>
              </div>
            </C.ClothesCard>
          ))}
        </S.SliderItem>

        {user && (
          <>
            <S.SliderItem className='keen-slider__slide'>
              <S.LookbookList>
                {lookbook?.map((item) => (
                  <S.LookbookCard key={item.memberOutfitId}>
                    {getClothesImageJSX(item.topType, item.topColor)}
                    {getClothesImageJSX(item.bottomType, item.bottomColor)}
                  </S.LookbookCard>
                ))}

                {(!lookbook || lookbook.length <= 3) && (
                  <S.LookbookCard $content='add'>
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

const outFitName = {
  OUTER: '상의',
  TOP: '상의',
  LAYERED: '상의',
  BOTTOM: '하의',
  ETC: '꼭 챙기세요!',
  BASIC_UMBRELLA: '꼭 챙기세요!',
  FOLDING_UMBRELLA: '꼭 챙기세요!',
} as const;

function getClothesImage(outfitType: OutfitType, names: ClothesImageName[]) {
  let Image;

  /** 대표 이미지가 둘 이상 포함되어 있는 경우, 특정 옷의 이미지를 보여줌 */
  if (outFitName[outfitType] === '상의' && names.length === 2) {
    if (names.includes('민소매') && names.includes('반팔티')) {
      Image = clothesImage.민소매;
    }
  }

  if (outFitName[outfitType] === '하의') {
    if (names.length === 3) Image = clothesImage.바지;
    else if (names.length === 2) {
      if (names.includes('반바지') && names.includes('슬랙스')) {
        Image = clothesImage.바지;
      } else if (names.includes('면바지') && names.includes('청바지')) {
        Image = clothesImage.청바지;
      }
    }
  }

  if (outFitName[outfitType] === '꼭 챙기세요!' && names.length === 2) {
    if (names.includes('접이식 우산')) {
      Image = clothesImage.겉옷접이식우산;
    } else if (names.includes('장우산')) {
      Image = clothesImage.겉옷장우산;
    }
  }

  /** 위의 조건에서 찾지 못했을 때, 대표 이미지를 찾음 */
  for (const name of names) {
    if (Image) break;

    if (name === '슬랙스' || name === '면바지' || name === '기모 바지') {
      Image = clothesImage.바지;
    } else {
      Image = clothesImage[name];
    }
  }

  return Image ? <Image /> : <img src='not' alt='.' />;
}

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
