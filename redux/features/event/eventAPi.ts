// redux/features/event/eventApi.ts
import baseApi from '@/redux/api/baseApi';



const eventApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        createEvent: build.mutation({
            query: (body) => ({
                url: '/events',
                method: 'POST',
                body,  // send JSON body, no images on create
            }),
            invalidatesTags: ['Event'],
        }),
        // GET: Get All Students
        getAllEvents: build.query({
            query: () => '/events', // ensure your backend route is '/students'
            providesTags: ["Event"],
        }),

    }),
});

export const {

    useCreateEventMutation,
    useGetAllEventsQuery

} = eventApi;

export default eventApi;
