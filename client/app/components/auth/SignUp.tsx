"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible, AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email("Invalid email").required("You must enter an email"),
  password: Yup.string().required("Please enter a password").min(6, "Password must be at least 6 characters"),
});

const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successful";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error, data?.message, setRoute]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = { name, email, password };
      await register(data);
    },
  });

  const { values, handleChange, handleSubmit, errors, touched } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Join with Younovel</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="name">
          Enter your name
        </label>
        <input type="text" name="" value={values.name} onChange={handleChange} id="name" placeholder="John Doe" className={`${errors.name && touched.name && "border-red-500"} ${styles.input}`} />
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
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <div className="mt-[1em]" />
        <h5 className="text-center pt-4 font-Poppins text-[0.9em] text-black dark:text-white">Or register with</h5>
        <div className="w-full flex justify-center items-center mt-2">
          <FcGoogle size={30} className="cursor-pointer" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[0.9em]">
          Already have an account?{" "}
          <span className="text-[#2190ff] pl-1 cursor-pointer" onClick={() => setRoute("Login")}>
            Sign in
          </span>
        </h5>
        <div className="mt-[1em]" />
      </form>
    </div>
  );
};

export default SignUp;
