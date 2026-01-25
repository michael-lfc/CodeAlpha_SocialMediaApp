import { useState } from "react";

export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState<number>(initialPage);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => Math.max(prev - 1, 1));
  const goToPage = (pageNumber: number) => setPage(Math.max(pageNumber, 1));
  const resetPage = () => setPage(1);

  return {
    page,
    nextPage,
    prevPage,
    goToPage,
    resetPage,
    setPage,
  };
};
