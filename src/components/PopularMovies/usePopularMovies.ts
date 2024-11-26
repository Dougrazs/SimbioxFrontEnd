import { useCallback, useRef } from "react";

export const usePopularMovies = () => {
  const sliderRef = useRef(null);


  const handlePrev = useCallback(() => {
    if (!sliderRef?.current) return;
    sliderRef?.current?.swiper?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef?.current) return;
    sliderRef?.current?.swiper?.slideNext();
  }, []);

  return {
    handlePrev,
    handleNext,
    sliderRef
  }
}