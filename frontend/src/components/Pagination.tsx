import type { Pagination as PaginationType } from "../types/api.types";

type PaginationProps = {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  loading?: boolean;
};

const Pagination = ({ pagination, onPageChange, loading }: PaginationProps) => {
  const { page, totalPages, hasNextPage, hasPrevPage } = pagination;

  return (
    <div className="pagination">
      <button
        disabled={!hasPrevPage || loading}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={!hasNextPage || loading}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
