// ====================================================
// 📂 Category API Module - Category Management
// ====================================================

import baseApi from '@/redux/api/baseApi';

const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 🔹 Get all courses
    getAllCategories: build.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      providesTags: ['Category'],
    }),

    // 🔹 Get single course by ID
    getCategoryById: build.query({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: 'GET',
      }),
      providesTags:  ["Category"],
    }),

    // 🔹 Create a new course
    createCategory: build.mutation({
      query: (data: FormData) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),

   
    // 🔹 Delete course by ID
    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
       invalidatesTags: ['Category'],
    }),
  }),
});

export const {
useCreateCategoryMutation,
useGetAllCategoriesQuery,
useDeleteCategoryMutation
} = categoryApi;

export default categoryApi;