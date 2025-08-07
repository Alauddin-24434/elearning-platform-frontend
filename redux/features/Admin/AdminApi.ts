// admissionApi.ts
import baseApi from '@/redux/api/baseApi';

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // POST: Create Student
    createAdmin: build.mutation({
      query: (formData) => ({
        url: '/admins',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ["Admin"],
    }),

    // GET: Get All Students
    getAllAdmins: build.query({
      query: () => '/admins', // ensure your backend route is '/students'
      providesTags: ["Admin"],
    }),



    // GET: Get Students by User ID
    getAdminsByUserId: build.query({
      query: (userId) => `/admins/${userId}`, // adjust URL based on your backend route
      providesTags: ["Admin"],
    }),



  }),
});

export const {
  useCreateAdminMutation,
  useGetAdminsByUserIdQuery,
  useGetAllAdminsQuery

} = adminApi;
