// teacherApi.ts
import baseApi from '@/redux/api/baseApi';

const teacherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // POST: Create Teacher
    createTeacher: build.mutation({
      query: (formData) => ({
        url: '/teachers',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Teacher"],
    }),

    // GET: Get All Teachers
    getAllTeachers: build.query({
      query: () => '/teachers',
      providesTags: ["Teacher"],
    }),

    // GET: Get Teacher by User ID
    getTeacherByUserId: build.query({
      query: (userId) => `/teachers/user/${userId}`,
      providesTags: ["Teacher"],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useGetAllTeachersQuery,
  useGetTeacherByUserIdQuery,
} = teacherApi;
