import { IMovie } from "@/types/moviesTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useFilmes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const fetchMovies = async (): Promise<{ results: IMovie[]; total_pages: number }> => {
    const response = await fetch(
      `http://localhost:3005/api/movies/search?query=${searchTerm}&page=${currentPage}`
    );
    if (!response.ok) throw new Error("Failed to fetch movies");
    return response.json();
  };

  const { data: moviesSearched = { results: [], total_pages: 1 }, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['SearchMovies', currentPage],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: 2,
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchTerm.trim()) {
      setCurrentPage(1);
      refetch();
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= moviesSearched?.total_pages) {
      setCurrentPage(page);
      queryClient.invalidateQueries({ queryKey: ['SearchMovies', page] })
    }
  };

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['SearchMovies', currentPage] });
  }, [queryClient, currentPage]);

  return {
    moviesSearched,
    handlePageChange,
    onSubmit,
    setSearchTerm,
    searchTerm,
    isLoading,
    isFetching,
    error,
    currentPage,
  };
};
