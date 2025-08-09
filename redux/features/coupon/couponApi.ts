// ====================================================
// 📂 Coupon API Module - Coupon Management
// ====================================================

import baseApi from '@/redux/api/baseApi';

const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 🔹 Get all coupons
    getAllCoupons: build.query({
      query: () => ({
        url: '/coupons',
        method: 'GET',
      }),
      providesTags: ['Coupon'],
    }),

    // 🔹 Get a single coupon by ID
    getCouponById: build.query({
      query: (id: string) => ({
        url: `/coupons/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Coupon', id }],
    }),

    // 🔹 Create a new coupon
    createCoupon: build.mutation({
      query: (data) => ({
        url: '/coupons',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Coupon'],
    }),

    // 🔹 Update coupon by ID
    updateCoupon: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/coupons/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Coupon', id },
        'Coupon',
      ],
    }),

    // 🔹 Delete coupon by ID
    deleteCoupon: build.mutation({
      query: (id: string) => ({
        url: `/coupons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Coupon', id },
        'Coupon',
      ],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;

export default couponApi;
