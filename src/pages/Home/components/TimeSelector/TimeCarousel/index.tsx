import { useEffect, useRef, useState } from 'react';
import { ITEM_HEIGHT, S } from './style';
import { SelectedTime } from '../../..';

type TimeCarouselProps = {
  times: string[];
  type: keyof SelectedTime;
  updateSelectedTime: (
    key: keyof SelectedTime,
    value: SelectedTime[keyof SelectedTime]
  ) => void;
};

const TimeCarousel = ({
  times,
  type,
  updateSelectedTime,
}: TimeCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(
    type === 'end' ? Math.min(times.length - 1, 8) : 0
  );
  const [userSelected, setUserSelected] = useState(times[currentIndex]);
  const [isDragging, setIsDragging] = useState(false);
  const [prevPageY, setPrevPageY] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const carouselRef = useRef<HTMLOListElement>(null);
  const itemsRef = useRef<Array<HTMLElement | null>>([]);

  const handleDragging = (e: React.PointerEvent) => {
    if (!carouselRef.current || !isDragging) return;
    e.preventDefault();

    const positionDiff = e.pageY - prevPageY;
    carouselRef.current.scrollTop = prevScrollTop - positionDiff;

    if (Math.abs(positionDiff) > ITEM_HEIGHT / 3) {
      const index = Math.round(carouselRef.current.scrollTop / ITEM_HEIGHT);
      setCurrentIndex(index);
    }
  };

  const handleDragStart = (e: React.PointerEvent) => {
    if (!carouselRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setPrevPageY(e.pageY);
    setPrevScrollTop(carouselRef.current.scrollTop);
  };

  const handleDragStop = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUserSelected(times[currentIndex]);
    updateSelectedTime(type, times[currentIndex]);
    itemsRef.current[currentIndex]?.scrollIntoView({
      block: 'center',
    });
  };

  useEffect(() => {
    const selectedIndex = times.indexOf(userSelected);
    const index = selectedIndex >= 0 ? selectedIndex : 0;

    setCurrentIndex(index);
    updateSelectedTime(type, times[index]);
    itemsRef.current[index]?.scrollIntoView({
      block: 'center',
    });
  }, [times, userSelected]);

  return (
    <>
      <S.Carousel
        ref={carouselRef}
        onPointerMove={handleDragging}
        onPointerDown={handleDragStart}
        onPointerUp={handleDragStop}
        onPointerLeave={handleDragStop}
      >
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

export default TimeCarousel;
