"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredintials } from "@/redux/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data).unwrap();
      dispatch(
        setCredintials({
          user: res?.data?.user,
          token: res?.data?.accessToken,
        })
      );
      router.replace(redirect);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#100d28]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto p-8 bg-[#080613] rounded-2xl shadow-xl text-white"
      >
        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-8">
 
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Login to Your Account 🔑
          </h2>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-200">
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            type="email"
            className={`w-full rounded-lg px-4 py-2 bg-[#1c1935] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a111] transition ${
              errors.email ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-200">
            Password
          </label>
          <input
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            className={`w-full rounded-lg px-4 py-2 bg-[#1c1935] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a111] transition ${
              errors.password ? "ring-2 ring-red-500" : ""
            }`}
            placeholder="********"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#d8a111] hover:bg-[#C18F10] text-[#100d28] cursor-pointer font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Don't have account */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#d8a111] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
