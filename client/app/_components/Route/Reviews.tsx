import { styles } from "@/styles";
import { reviews } from "@/utils";
import Image from "next/image";
import React, { FC } from "react";
import ReviewCard from "./ReviewCard";

type Props = {};

const Reviews: FC<Props> = () => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            className="rounded-lg"
            alt="img"
            width={500}
            height={500}
            src={require("../../../assets/review_img.png")}
          />
        </div>

        <div className="800px:w-[50%] m-2 w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error
            debitis quia, numquam ullam eligendi veniam asperiores repellendus
            magni labore reprehenderit aut officia enim, quod atque inventore
            obcaecati. Eveniet, praesentium quasi.
          </p>
        </div>
        <br />
        <br />
      </div>

      <div className="mt-[40px] grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg-gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0">
        {reviews.map((review, index) => (
          <ReviewCard key={index} item={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
