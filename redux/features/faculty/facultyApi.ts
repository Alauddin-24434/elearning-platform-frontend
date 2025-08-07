import baseApi from "@/redux/api/baseApi";

export const facultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFaculty: builder.mutation({
      query: (data) => ({
        url: '/faculties',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Faculty'],
    }),
    getFaculties: builder.query({
      query: () => '/faculties',
      providesTags: ['Faculty'],
    }),
  }),
});

export const {
  useCreateFacultyMutation,
  useGetFacultiesQuery,
} = facultyApi;
