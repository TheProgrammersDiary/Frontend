"use client"

import "../../globals.css";
import { useForm } from "react-hook-form";
import { blogUrl } from "../../next.config.js";
import { useState } from "react";

export default function ResetPassword() {
    const { register, setError, handleSubmit, reset, formState } = useForm();
    const [responseMessage, setResponseMessage] = useState(<p></p>);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">Reset password</h1>
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
                    <div className="mb-4">
                        <label
                            htmlFor="resetToken"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Reset token (to confirm your identity)
                        </label>
                        <input
                            {...register("resetToken", { required: true })}
                            name="resetToken"
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            New password
                        </label>
                        <input
                            {...register("newPassword", { required: true })}
                            name="newPassword"
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="repeatedNewPassword"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Repeat new password
                        </label>
                        <input
                            {...register("repeatedNewPassword", { required: true })}
                            name="repeatedNewPassword"
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-2">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Submit
                        </button>
                    </div>
                </form>
                {formState.errors.repeatedNewPassword && (
                    <p className="text-red-500">{formState.errors.repeatedNewPassword.message}</p>
                )
                }
                {responseMessage}
            </div>
        </div>
    );

    async function onSubmit(data, event) {
        setResponseMessage(<p></p>);
        event.preventDefault();
        if (data.newPassword !== data.repeatedNewPassword) {
            setError("repeatedNewPassword", {
                type: "manual",
                message: "New password and repeated new password do not match.",
            });
            return;
        }
        const body = { "email": data.email, "resetToken": data.resetToken, "newPassword": data.newPassword };
        try {
            const response = await fetch(
                blogUrl + "/users/reset-password",
                {
                    method: "PATCH",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" },
                    credentials: "omit"
                }
            );
            if (response.status === 401) {
                const text = await response.text();
                throw new Error(text);
              }
            reset();
            setResponseMessage(<p className="text-green-500">Password was reset successfully.</p>);
        } catch (error) {
            setResponseMessage(<p className="text-red-500">{error.message}</p>);
        }
    }
}