"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("You must enter an email"),
  password: Yup.string().required("Please enter a password").min(6, "Password must be at least 6 characters"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lgoin Successfuly!");
      setOpen(false);
    }
    if (error) {
      toast.error("Login Failed!");
    }
  }, [isSuccess, error, setOpen]);

  const { values, handleChange, handleSubmit, errors, touched } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with Younovel</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Enter your email
        </label>
        <input type="email" name="" value={values.email} onChange={handleChange} id="email" placeholder="loginmail@gmail.com" className={`${errors.email && touched.email && "border-red-500"} ${styles.input}`} />
        {errors.email && touched.email && <p className="text-red-500 pt-2 block">{errors.email}</p>}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your password
          </label>
          <input type={show ? "text" : "password"} name="" value={values.password} onChange={handleChange} id="password" placeholder="password!@;" className={`${errors.password && touched.password && "border-red-500"} ${styles.input}`} />
          {!show ? (
            <AiOutlineEyeInvisible size={20} className="absolute right-2 bottom-3 z-1 cursor-pointer" onClick={() => setShow(true)} />
          ) : (
            <AiOutlineEye size={20} className="absolute right-2 bottom-3 z-1 cursor-pointer" onClick={() => setShow(false)} />
          )}
        </div>
        {errors.password && touched.password && <p className="text-red-500 pt-2 block">{errors.password}</p>}
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <div className="mt-[1em]" />
        <h5 className="text-center pt-4 font-Poppins text-[0.9em] text-black dark:text-white">Or login with</h5>
        <div className="w-full flex justify-center items-center mt-2">
          <FcGoogle size={30} className="cursor-pointer" onClick={() => signIn("google")} />
          <AiFillGithub size={30} className="cursor-pointer ml-2" onClick={() => signIn("github")} />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[0.9em]">
          Don&apos;t have an account?{" "}
          <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute("Sign-Up")}>
            Sign up
          </span>
        </h5>
        <div className="mt-[1em]" />
      </form>
    </div>
  );
};

export default Login;
