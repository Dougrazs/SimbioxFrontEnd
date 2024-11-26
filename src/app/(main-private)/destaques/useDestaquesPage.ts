
import { API_URL } from '@/constants/urls';
import { useQuery } from '@tanstack/react-query';

export const useDestaquesPage = () => {
  async function fetchPopularMovies() {
    const response = await fetch(`${API_URL}/popular`);
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