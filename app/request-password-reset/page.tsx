"use client"

import "../../globals.css";
import { useForm } from "react-hook-form";
import { blogUrl } from "../../next.config.js";
import { useRouter } from "next/navigation";

export default function RequestPasswordReset() {
    const { register, handleSubmit, reset } = useForm();
    const router = useRouter();

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">Request password reset</h1>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            name="email"
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-2">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    async function onSubmit(data, event) {
        event.preventDefault();
        try {
            const response = await fetch(
                blogUrl + "/users/request-password-reset",
                {
                    method: "POST",
                    body: data.email,
                    credentials: "omit"
                }
            );
            reset();
            router.push("/reset-password");
        } catch (error) {
        }
    }
}