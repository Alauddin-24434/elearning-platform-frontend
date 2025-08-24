import baseApi from "@/redux/api/baseApi"

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviewsByCourseId: builder.query({
      query: (courseId: string) => `/reviews/course/${courseId}`,
      providesTags: ["Review"],
    }),

    addReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
})

export const { useGetReviewsByCourseIdQuery, useAddReviewMutation } = reviewApi
