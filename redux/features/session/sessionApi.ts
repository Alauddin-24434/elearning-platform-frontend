import baseApi from "@/redux/api/baseApi"

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => "/sessions",
      providesTags: ["Session"],
    }),
    createSession: builder.mutation({
      query: (data) => ({
        url: "/sessions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
    }),
  }),
})

export const { useGetSessionsQuery, useCreateSessionMutation } = sessionApi
