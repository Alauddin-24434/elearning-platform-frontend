"use client";

import { useSignUpUserMutation } from "@/redux/features/auth/authApi";
import { setCredintials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  avatar: FileList;
}

export default function SignupPage() {
  const [signUpUser] = useSignUpUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);

      if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      }

      const res = await signUpUser(formData).unwrap();
      dispatch(
        setCredintials({
          user: res?.data?.user,
          token: res?.data?.accessToken,
        })
      );
      router.replace(redirect);
    } catch (error) {
      console.error(error);
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
            Sign up to Join Us 🚀
          </h2>
        </div>


        {/* Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-1 font-medium text-gray-200">
            Full Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            type="text"
            className={`w-full rounded-lg px-4 py-2 bg-[#1c1935] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a111]  transition ${errors.name ? "ring-2 ring-red-500" : ""
              }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
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
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
            type="email"
            className={`w-full rounded-lg px-4 py-2 bg-[#1c1935] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a111]  transition ${errors.email ? "ring-2 ring-red-500" : ""
              }`}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-1 font-medium text-gray-200">
            Phone
          </label>
          <input
            id="phone"
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 10, message: "Minimum 10 digits" },
            })}
            type="text"
            className={`w-full rounded-lg px-4 py-2 bg-[#1c1935] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a111]  transition ${errors.phone ? "ring-2 ring-red-500" : ""
              }`}
            placeholder="+8801XXXXXXXXX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
          )}
        </div>

        {/* Upload input */}
        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-200">
            Choose profile photo
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("avatar")}
            className="w-full rounded-md px-4 py-2 bg-[#1c1935] cursor-pointer text-white file:cursor-pointer file:text-white file:bg-[#100d28] file:border-none file:rounded-md file:px-3 file:py-1 focus:outline-none focus:ring-2 focus:ring-[#d8a111] "
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-200"
          >
            Password
          </label>
          <input
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            className={`w-full rounded-lg px-4 py-2 bg-[#1c1935] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d8a111]  transition ${errors.password ? "ring-2 ring-red-500" : ""
              }`}
            placeholder="********"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#d8a111] cursor-pointer hover:bg-[#C18F10] text-[#100d28] font-semibold py-3 rounded-lg shadow-md cur-po transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        {/* Already have account */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#d8a111] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
