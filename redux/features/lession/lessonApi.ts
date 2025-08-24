// ====================================================
// 📂 Lesson API Module - Lesson Management
// ====================================================

import baseApi from '@/redux/api/baseApi';
import type { Lesson } from '@/types'; // adjust path if needed

const lessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 🔹 Get all lessons (with optional query params)
    getAllLessons: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.searchTerm) queryParams.append('searchTerm', params.searchTerm);
        if (params?.courseId) queryParams.append('courseId', params.courseId);
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.page) queryParams.append('page', String(params.page));

        return {
          url: `/lessons?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Lesson'],
    }),

    // 🔹 Get single lesson by ID
    getLessonById: build.query<Lesson, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'GET',
      }),
      providesTags: ['Lesson'],
    }),

    // 🔹 Create a new lesson
    createLesson: build.mutation<Lesson, FormData>({
      query: (formData) => ({
        url: '/lessons',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Lesson'],
    }),

    // 🔹 Update lesson by ID
    updateLesson: build.mutation<Lesson, { id: string; data: any }>({
      query: ({ id, data }) => {
        console.log("Updating lesson:", id, data); // debug
        return {
          url: `/lessons/${id}`,
          method: 'PATCH',
          body: data, // JSON body
        };
      },
      invalidatesTags: ['Lesson'],
    }),

    // 🔹 Delete lesson by ID
    deleteLesson: build.mutation({
      query: (id: string) => ({
        url: `/lessons/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lesson'],
    }),

       // 🔹 Get lessons by course slug
    getLessonsBySlug: build.query({
      query: (slug) => ({
        url: `/lessons/${slug}`,
        method: "GET",
      }),
      providesTags: ["Lesson"],
    }),

    // 🔹 Update lesson progress
    updateLessonProgress: build.mutation<void, { lessonId: string; courseId: string }>({
      query: ({ lessonId, courseId }) => ({
        url: "/lessons/progress",
        method: "PATCH",
        body: { lessonId, courseId },
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),



});

export const {
  useGetAllLessonsQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useGetLessonsBySlugQuery,
  useUpdateLessonProgressMutation,
} = lessonApi;

export default lessonApi;
