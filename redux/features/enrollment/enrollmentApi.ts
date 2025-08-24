// ====================================================
// 📂 Enrollment API Module - Enrollment Management
// ====================================================

import baseApi from '@/redux/api/baseApi';

const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 🔹 Enroll a user to a course
    enrollCourse: build.mutation({
      query: (body) => ({
        url: '/enrollments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Enrollment'], 
    }),
        getEnrollmentsByUserId: build.query({
      query: (userId) => ({
        url: `/enrollments/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Course'],
    }),

  }),
});

export const {
  useEnrollCourseMutation,
  useGetEnrollmentsByUserIdQuery
} = enrollmentApi;

export default enrollmentApi;
