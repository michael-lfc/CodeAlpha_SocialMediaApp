export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message?: string;
  pagination: Pagination;
  total?: number;
  posts?: T;
  comments?: T;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// types/auth.types.ts
export interface AuthResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    profileImage?: string;
  };
}


// export interface ApiResponse<T> {
//   success: boolean;
//   message?: string;
//   data?: T;
//   post?: T;
//   comment?: T;
//   user?: T;
// }
