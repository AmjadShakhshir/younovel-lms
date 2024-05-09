import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

import { styles } from "../../../app/styles/style";

type Props = {};
const Hero: FC<Props> = (props) => {
  const renderImages = () => (
    <>
      <Image src={require("../../../public/assets/banner-img-2.png")} alt="Student image" className="rounded-full" width={50} height={50} />
      <Image src={require("../../../public/assets/banner-img-2.png")} alt="Student image" className="rounded-full ml-[-20px]" width={50} height={50} />
      <Image src={require("../../../public/assets/banner-img-2.png")} alt="Student image" className="rounded-full ml-[-20px]" width={50} height={50} />
    </>
  );
  return (
    <div className="w-full 1000px:flex items-center">
      <div className={`${styles.heroAnimation}`}></div>
      <div className={`${styles.heroImageContainer}`}>
        <Image src={require("../../../public/assets/banner-img-1.png")} alt="banner" className={`${styles.heroImage}`} priority />
      </div>
      <div className={`${styles.heroTextContainer}`}>
        <h2 className={`${styles.heroTitle}`}>Improve Your Online Learning Experience Better Instantly</h2>
        <div className="mt-[1em]" />
        <p className={`${styles.heroSubtitle}`}>We have 40k+ online courses & 500k+ online registered students. Find your desired Courses from them.</p>
        <div className="mt-[1em]" />
        <div className="mt-[1em]" />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
          <input type="search" placeholder="Search for Courses..." className={`${styles.heroSearchInput}`} />
          <div className={`${styles.heroSearchIconContainer}`}>
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <div className="mt-[1em]" />
        <div className="mt-[1em]" />
        <div className={`${styles.heroTrustStatementContainer}`}>
          {renderImages()}
          <p className={`${styles.heroTrustStatement}`}>
            500k+ people already trusted us. Join them now.
            <Link href="/courses" className="dark:text-[#46e256] text-[crimson] ml-2">
              View Courses
            </Link>{" "}
          </p>
        </div>
        <div className="mt-[1em]" />
      </div>
    </div>
  );
};

export default Hero;
