import { useCallback, useRef } from "react";

export default function useSwiperControllers() {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (sliderRef?.current) {
      sliderRef?.current?.swiper?.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (sliderRef?.current) {
      sliderRef?.current?.swiper?.slideNext();
    }
  }, []);

  return {
    handlePrev,
    handleNext,
    sliderRef
  }
};
