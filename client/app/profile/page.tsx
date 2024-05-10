"use client";
import React, { FC } from "react";

import Protected from "../hooks/useProtected";
import CustomPage from "../layout/CustomPage";
import Profile from "../components/profile/Profile";
import useAppSelector from "../../redux/customHooks/useAppSelector";

type Props = {};

const Page: FC<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);
  if (Object.keys(user).length === 0) {
    return null;
  }
  const parsedUser = JSON.parse(user);

  return (
    <section>
      <Protected>
        <CustomPage headerTitle={`${parsedUser?.name} profile`}>
          <Profile />
        </CustomPage>
      </Protected>
    </section>
  );
};

export default Page;
