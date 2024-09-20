import { useEffect, useRef, useState } from 'react';
import { S } from './TimeCarousel.style';
import { SelectedTime } from '..';

type TimeCarouselProps = {
  times: string[];
  type: keyof SelectedTime;
  handleSelectedTime: (key: keyof SelectedTime, value: string) => void;
};

const TimeCarousel = ({
  times,
  type,
  handleSelectedTime,
}: TimeCarouselProps) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(
    type === 'end' ? Math.min(times.length - 1, 8) : 0
  );
  const [isDragging, setIsDragging] = useState(false);
  const [prevPageY, setPrevPageY] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  const carouselRef = useRef<HTMLOListElement>(null);
  const itemsRef = useRef<Array<HTMLElement | null>>([]);

  const dragging = (e: React.PointerEvent) => {
    e.preventDefault();
    if (!carouselRef.current || !isDragging) return;

    const positionDiff = e.pageY - prevPageY;

    carouselRef.current.scrollTop = prevScrollTop - positionDiff;

    if (Math.abs(positionDiff) > 20 / 3) {
      setCurrentItemIndex(Math.round(carouselRef.current.scrollTop / 20));
    }
  };

  const dragStart = (e: React.PointerEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setPrevPageY(e.pageY);
    setPrevScrollTop(carouselRef.current.scrollTop);
  };

  const dragStop = () => {
    setIsDragging(false);
    itemsRef.current[currentItemIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  useEffect(() => {
    itemsRef.current[currentItemIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, []);

  useEffect(() => {
    const index = type === 'end' ? Math.min(times.length - 1, 8) : 0;
    setCurrentItemIndex(index);
    itemsRef.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [times]);

  useEffect(() => {
    handleSelectedTime(type, times[currentItemIndex]);
  }, [currentItemIndex]);

  return (
    <S.Carousel
      ref={carouselRef}
      onPointerMove={dragging}
      onPointerDown={dragStart}
      onPointerUp={dragStop}
      onPointerLeave={dragStop}
    >
      {times.map((time, index) => (
        <S.Item
          key={time}
          className={`${currentItemIndex === index && 'is-active'}`}
          data-index={index}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
        >
          {time}
        </S.Item>
      ))}
    </S.Carousel>
  );
};

export default TimeCarousel;
