import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ITEM_HEIGHT, S } from './TimeCarousel.style';
import { SelectedTime } from '../../ui/Page/HomePage';

type TimeCarouselProps = {
  times: string[];
  type: keyof SelectedTime;
  selectedTime: string;
  initial?: number;
  updateSelectedTime: (
    key: keyof SelectedTime,
    value: SelectedTime[keyof SelectedTime]
  ) => void;
};

const TimeCarousel = ({
  times,
  type,
  selectedTime,
  updateSelectedTime,
}: TimeCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(() =>
    getInitialIndex(times, selectedTime)
  );
  const [userSelected, setUserSelected] = useState(times[currentIndex]);
  const [isDragging, setIsDragging] = useState(false);
  const startPageYRef = useRef(0);
  const startScrollTopRef = useRef(0);
  const carouselRef = useRef<HTMLOListElement>(null);
  const itemsRef = useRef<Array<HTMLElement | null>>([]);

  const handleDragging = useCallback(
    (e: PointerEvent) => {
      e.preventDefault();
      if (!carouselRef.current || !isDragging) return;

      const positionDiff = e.pageY - startPageYRef.current;
      carouselRef.current.scrollTop = startScrollTopRef.current - positionDiff;

      if (Math.abs(positionDiff) > ITEM_HEIGHT / 3) {
        const index = Math.round(carouselRef.current.scrollTop / ITEM_HEIGHT);
        setCurrentIndex(index);
      }
    },
    [isDragging]
  );

  const handleDragStart = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!carouselRef.current) return;

    setIsDragging(true);
    startPageYRef.current = e.pageY;
    startScrollTopRef.current = carouselRef.current.scrollTop;
  };

  const handleDragStop = useCallback(
    (e: PointerEvent) => {
      e.preventDefault();
      if (!isDragging) return;

      setIsDragging(false);
      setUserSelected(times[currentIndex]);
      updateSelectedTime(type, times[currentIndex]);
      itemsRef.current[currentIndex]?.scrollIntoView({
        block: 'center',
      });
    },
    [times, currentIndex, isDragging]
  );

  useEffect(() => {
    const selectedIndex = times.indexOf(userSelected);
    const index = selectedIndex >= 0 ? selectedIndex : 0;

    setCurrentIndex(index);
    updateSelectedTime(type, times[index]);
    itemsRef.current[index]?.scrollIntoView({
      block: 'center',
    });
  }, [times, userSelected]);

  useEffect(() => {
    window.addEventListener('pointermove', handleDragging);
    window.addEventListener('pointerup', handleDragStop);

    return () => {
      window.removeEventListener('pointermove', handleDragging);
      window.removeEventListener('pointerup', handleDragStop);
    };
  }, [handleDragging, handleDragStop]);

  return (
    <>
      <S.Carousel ref={carouselRef} onPointerDown={handleDragStart}>
        {times.map((time, index) => (
          <S.Item
            key={time}
            className={`${currentIndex === index && 'is-active'}`}
            data-index={index}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
          >
            {time}
          </S.Item>
        ))}
      </S.Carousel>
    </>
  );
};

export default memo(TimeCarousel);

function getInitialIndex(times: string[], selectedTime: string) {
  return times.findIndex((time) => time === selectedTime);
}
