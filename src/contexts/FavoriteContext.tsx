import { IMovie } from '@/types/moviesTypes';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_URL } from '@/constants/urls';

interface FavoritesContextType {
  favorites: Array<IMovie>;
  isFavorite: (movieId: number) => boolean;
  loadingFavorites: boolean;
  errorFavorites: string | null;
  handleFavoriteMovie: (movieId: number) => void;
  isLoadingFavoriteAction: boolean;
}

interface MovieMutationVariables {
  movieId: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('user');
      const parsedUser = data ? JSON.parse(data) : null;
      setUserId(parsedUser?._id || null);
    }
  }, []);

  const fetchFavoriteMovies = async (userId: string): Promise<Array<IMovie>> => {
    const response = await fetch(`${API_URL}/user/${userId}/favorites`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data?.favoriteMovies?.movies ?? [];
  };

  const { data: favorites = [], isLoading: loadingFavorites, error } = useQuery({
    queryKey: ['favoriteMovies', userId],
    queryFn: () => fetchFavoriteMovies(userId as string),
    enabled: !!userId, // Only run the query if userId is available
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  const errorFavorites = error instanceof Error ? error.message : null;

  const removeMovieFromFavorites = useMutation<void, Error, MovieMutationVariables>({
    mutationFn: async ({ movieId }) => {
      const response = await fetch(`${API_URL}/user/${userId}/favorites/${movieId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to remove movie from favorites');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteMovies', userId] });
    },
  });

  const addMovieToFavorites = useMutation<void, Error, MovieMutationVariables>({
    mutationFn: async ({ movieId }) => {
      const response = await fetch(`${API_URL}/user/${userId}/favorites/${movieId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, movieId }),
      });

      if (!response.ok) {
        throw new Error('Failed to add movie to favorites');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoriteMovies', userId] });
    },
  });

  const handleFavoriteMovie = (movieId: number) => {
    if (isFavorite(movieId)) {
      removeMovieFromFavorites.mutate({ movieId });
    } else {
      addMovieToFavorites.mutate({ movieId });
    }
  };

  const isFavorite = (movieId: number) => favorites?.some((movie) => movie.id === movieId);

  const isLoadingFavoriteAction =
    addMovieToFavorites.status === 'pending' || removeMovieFromFavorites.status === 'pending';

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        loadingFavorites,
        errorFavorites,
        handleFavoriteMovie,
        isLoadingFavoriteAction,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
