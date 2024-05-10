"use client";
import React, { FC, useState } from "react";

import CustomPage from "../app/layout/CustomPage";
import Hero from "./components/route/Hero";

type Props = {};

const Page: FC<Props> = (props) => {
  return (
    <main>
      <CustomPage>
        <Hero />
      </CustomPage>
    </main>
  );
};

export default Page;
