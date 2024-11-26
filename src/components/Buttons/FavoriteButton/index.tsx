import { Spinner } from '@/components';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';

import heartempty from '@/assets/icons/heart-outline.svg'
import heartfilled from '@/assets/icons/heart-filled.svg'

import Image from 'next/image';
interface FavoriteProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isFavorite: boolean;
  loading: boolean;
}

const FavoriteButton = forwardRef<HTMLButtonElement, FavoriteProps>(
  ({ isFavorite, loading, ...rest }, ref) => {
    if (loading) {
      return (
        <div className={'h-[40px]'}>
          <Spinner />
        </div>
      );
    }
    return (
      <button
        ref={ref}
        className={`cursor-pointer hover:opacity-30 active:opacity-100 transition-3s`}
        {...rest}
      >
        {isFavorite ? <Image className={'color-white'} width={32} alt="favorito" src={heartfilled} /> : <Image width={32} alt="não favorito" src={heartempty} />}
      </button>
    );
  }
);

FavoriteButton.displayName = 'FavoriteButton';

export default FavoriteButton;
