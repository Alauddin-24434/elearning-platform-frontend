
import baseApi from '@/redux/api/baseApi';

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
 

  
    getOverViews: build.query({
      query: () => ({
        url: '/overviews',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
useGetOverViewsQuery
} = dashboardApi;

