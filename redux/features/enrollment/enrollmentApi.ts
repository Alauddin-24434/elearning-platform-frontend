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
  }),
});

export const {
  useEnrollCourseMutation,
} = enrollmentApi;

export default enrollmentApi;
