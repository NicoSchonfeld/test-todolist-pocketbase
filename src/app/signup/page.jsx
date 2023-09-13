"use client";
import React, { useState } from "react";
import { createUser } from "@/lib/pocketbase";
import Link from "next/link";

const SignUp = () => {
  const [userScheme, setUserScheme] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserScheme({
      ...userScheme,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createUser(userScheme);
  };

  return (
    <section className="w-full py-20 flex items-center justify-center flex-col gap-5">
      <h1>Sign Up</h1>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center flex-col gap-5"
      >
        <input
          type="text"
          name="name"
          value={userScheme?.name}
          placeholder="name"
          onChange={handleChange}
          className="border px-3 py-2.5 rounded"
        />
        <input
          type="text"
          name="username"
          value={userScheme?.username}
          placeholder="username"
          onChange={handleChange}
          className="border px-3 py-2.5 rounded"
        />
        <input
          type="email"
          name="email"
          value={userScheme?.email}
          placeholder="email"
          onChange={handleChange}
          className="border px-3 py-2.5 rounded"
        />
        <input
          type="password"
          name="password"
          value={userScheme?.password}
          placeholder="password"
          onChange={handleChange}
          className="border px-3 py-2.5 rounded"
        />
        <input
          type="password"
          name="passwordConfirm"
          value={userScheme?.passwordConfirm}
          placeholder="password confirm"
          onChange={handleChange}
          className="border px-3 py-2.5 rounded"
        />

        <button
          type="submit"
          className="border rounded px-3 py-2.5 hover:shadow"
        >
          Sign Up
        </button>

        <button
          type="submit"
          className="border rounded px-3 py-2.5 hover:shadow bg-purple-500 text-white"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default SignUp;
