/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

export default function useSwiperControllers() {
  const sliderRef = useRef<any>(null);
  console.log({ sliderRef })
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
