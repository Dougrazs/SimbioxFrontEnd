
import { useQuery } from '@tanstack/react-query';

export const useDestaquesPage = () => {
  async function fetchPopularMovies() {
    const response = await fetch('http://localhost:3005/api/popular');
    const data = await response.json();
    return data;
  }

  const { data, isLoading, error } = useQuery(
    {
      queryKey: ['popularMovies'],
      queryFn: fetchPopularMovies
    }
  );


  return {
    data, isLoading, error
  }
}