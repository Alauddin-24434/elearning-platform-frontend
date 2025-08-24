// ====================================================
// 📂 Course API Module - Course Management
// ====================================================

import baseApi from '@/redux/api/baseApi';

const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 🔹 Get all courses
    // 🔹 Get all courses with query params
    getAllCourses: build.query({
        query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.searchTerm)
          queryParams.append('searchTerm', params.searchTerm);
        
        if (params?.category)
          queryParams.append('category', params.category);
        
        if (params?.sort) queryParams.append(' sort', String(params.sort));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.page) queryParams.append('page', String(params.page));

        return {
          url: `/courses?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Course'],
    }),

    getCoursesByAuthor: build.query({
      query: (authorId) => ({
        url: `/courses/author/${authorId}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),

    // 🔹 Get single course by ID
    getCourseById: build.query({
      query: (slug) => ({
        url: `/courses/${slug}`,
        method: 'GET',
      }),
      providesTags: ["Course"],
    }),

    // 🔹 Create a new course
    createCourse: build.mutation({
      query: (formData) => ({
        url: '/courses',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Course'],
    }),

    // 🔹 Update course by ID
updateCourse: build.mutation<Course, { id: string; data: any }>({
  query: ({ id, data }) => {
    console.log("Updating course:", id, data); // ✅ debug payload
    return {
      url: `/courses/${id}`,
      method: "PATCH",
      body: data, // send JSON body directly
    }
  },
})
,

    // 🔹 Delete course by ID
    deleteCourse: build.mutation({
      query: (id: string) => ({
        url: `/courses/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags:[
      
        'Course',
      ],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
useGetCoursesByAuthorQuery
} = courseApi;

export default courseApi;
