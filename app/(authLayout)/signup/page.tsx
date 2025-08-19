"use client";

import { useSignUpUserMutation } from "@/redux/features/auth/authApi";
import { setCredintials } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload, User } from "lucide-react";
import Link from "next/link";

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

  const [preview, setPreview] = useState<string | null>(null);

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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Create your account 🚀
        </h2>

        {/* Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            type="text"
            className={`w-full rounded-lg border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-1 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
            })}
            type="email"
            className={`w-full rounded-lg border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="example@mail.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-1 font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 10, message: "Minimum 10 digits" },
            })}
            type="text"
            className={`w-full rounded-lg border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+8801XXXXXXXXX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
 <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      
      {/* Upload input (TOP) */}
      <div className="w-full">
        <label className="block text-gray-700 font-medium mb-2">
          Upload File
        </label>
        <input
          type="file"
          onChange={handleAvatarChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Preview (BOTTOM) */}
      {preview && (
        <div className="w-full text-center">
          <h3 className="text-gray-700 font-semibold mb-3">Preview</h3>
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-64 object-cover rounded-lg shadow"
          />
        </div>
      )}
    </div>
        {/* Password */}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-1 font-medium text-gray-700"
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
            className={`w-full rounded-lg border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="********"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </button>

        {/* Already have account */}
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-emerald-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
