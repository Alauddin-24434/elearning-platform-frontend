// admissionApi.ts
import baseApi from '@/redux/api/baseApi';

const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // POST: Create Student
    createStudent: build.mutation({
      query: (formData) => ({
        url: '/students',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Student"],
    }),

    // GET: Get All Students
    getAllStudents: build.query({
      query: () => '/students', // ensure your backend route is '/students'
      providesTags: ["Student"],
    }),



    // GET: Get Students by User ID
    getStudentByUserId: build.query({
      query: (userId) => `/students/user/${userId}`, // adjust URL based on your backend route
      providesTags: ["Student"],
    }),



  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentByUserIdQuery, // 👈 exported hook

} = studentApi;
