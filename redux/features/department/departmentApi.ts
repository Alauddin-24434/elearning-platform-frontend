// ============================================
// 🏛️ Department API Module - Faculty & Dept
// ============================================

import baseApi from '@/redux/api/baseApi';

const departmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ✅ Create Department
    createDepartment: build.mutation({
      query: (body) => ({
        url: '/departments',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Department'],
    }),

    // ✅ Get All Departments
    getDepartments: build.query({
      query: () => ({
        url: '/departments',
        method: 'GET',
      }),
      providesTags: ['Department'],
    }),
  }),
});

export const {
  useCreateDepartmentMutation,
  useGetDepartmentsQuery,
} = departmentApi;

export default departmentApi;
