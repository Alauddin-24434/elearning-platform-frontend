import baseApi from '@/redux/api/baseApi';

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // 📤 Create payment
    createPayment: build.mutation({
      query: (body) => ({
        url: '/payments/initiate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),

    // 📥 Get all payments
    getPayments: build.query({
      query: () => ({
        url: '/payments',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // 📥 Get payment by ID
    getPaymentById: build.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // ✏️ Update payment
    updatePayment: build.mutation({
      query: ({ id, body }) => ({
        url: `/payments/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),

    // ❌ Delete payment
    deletePayment: build.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payment'],
    }),

    // 📤 Create payment type
    createPaymentType: build.mutation({
      query: (body) => ({
        url: '/payments/types',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),

    // 📥 Get all payment types
    getAllPaymentTypes: build.query({
      query: () => ({
        url: '/payments/types',
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // 📥 Get payment type by ID
    getPaymentTypeById: build.query({
      query: (id) => ({
        url: `/payments/types/${id}`,
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),

    // ✏️ Update payment type
    updatePaymentType: build.mutation({
      query: ({ id, body }) => ({
        url: `/payments/types/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Payment'],
    }),

    // ❌ Delete payment type
    deletePaymentType: build.mutation({
      query: (id) => ({
        url: `/payments/types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payment'],
    }),

  }),
});

export const {
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,

  useCreatePaymentTypeMutation,
  useGetAllPaymentTypesQuery,
  useGetPaymentTypeByIdQuery,
  useUpdatePaymentTypeMutation,
  useDeletePaymentTypeMutation,
} = paymentApi;
