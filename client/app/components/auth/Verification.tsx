"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import { styles } from "../../../app/styles/style";
import useAppSelector from "../../../redux/customHooks/useAppSelector";
import { useActivationMutation } from "../../../redux/features/auth/authApi";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      const errorData = error as any;
      toast.error(errorData.data.message);
      setInvalidError(true);
    } else {
      toast.error("An error occurred", error);
    }
  }, [isSuccess, error]);

  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({ token: token, activationCode: verificationNumber });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = {
      ...verifyNumber,
      [index]: value,
    };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value !== "" && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div className="">
      <h1 className={`${styles.title}`}>Verify your account</h1>
      <div className="mt-[1em]" />
      <div className="w-full flex justify-center items-center mt-2">
        <div className="w-[80px] h-[80px] flex justify-center items-center rounded-full bg-[#497DF2]">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <div className="mt-[1em]" />
      <div className="mt-[1em]" />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            key={key}
            ref={inputRefs[index]}
            type="number"
            placeholder=""
            value={verifyNumber[key as keyof VerifyNumber]}
            maxLength={1}
            onChange={(e) => handleInputChange(index, e.target.value)}
            className={`w-[65px] h-[65px] text-center text-[1.1em] font-Poppins text-black dark:text-white bg-transparent border-[3px] rounded-[10px] outline-none ${invalidError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"}`}
          />
        ))}
      </div>
      <div className="mt-[1em]" />
      <div className="mt-[1em]" />
      <div className="w-full flex justify-center">
        <button onClick={verificationHandler} className={`${styles.button}`}>
          Verify Account
        </button>
      </div>
      <div className="mt-[1em]" />
      <h5 className="text-center pt-4 font-Poppins text-[0.9em] text-black dark:text-white">
        Didn&apos;t receive the code? <span className="text-[#2190ff] pl-1 cursor-pointer">Resend</span>
      </h5>
    </div>
  );
};

export default Verification;
