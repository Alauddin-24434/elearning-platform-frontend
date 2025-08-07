"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { useLoginUserMutation } from "@/redux/features/auth/authApi"; // hypothetical login mutation
import { useDispatch } from "react-redux";
import { setCredintials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loginUser] = useLoginUserMutation(); // assuming you have this in your redux slice
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data).unwrap();
      console.log(res);
      dispatch(setCredintials({ user: res?.data?.user, token: res?.data?.accessToken }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Login to your account
        </h2>

        {/* Email Field */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            className={`w-full rounded-md border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            className={`w-full rounded-md border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.password ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#00362f] hover:bg-[#00483d] text-white font-semibold py-3 rounded-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
