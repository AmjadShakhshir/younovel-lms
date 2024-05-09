"use client";
import React, { FC, useState } from "react";

import Heading from "../utils/Heading";
import Header from "../components/Header";

import Protected from "../hooks/useProtected";
type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Protected>
        <Heading title="Younovel" description="Elearning platform for students to learn and practice their skills." keywords="Python, Agile, MERN, Programming, Digital Marketing, Graphic design, React. Typescript, Machine Learning" />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      </Protected>
    </div>
  );
};

export default Page;
