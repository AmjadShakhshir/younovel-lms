"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";

type Props = {
  children: React.ReactNode;
  headerTitle?: string;
};

const CustomPage: FC<Props> = ({ children, headerTitle }) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <section>
      <Heading title={headerTitle || "Younovel"} description="Elearning platform for students to learn and practice their skills." keywords="Python, Agile, MERN, Programming, Digital Marketing, Graphic design, React. Typescript, Machine Learning" />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      {children}
    </section>
  );
};

export default CustomPage;
