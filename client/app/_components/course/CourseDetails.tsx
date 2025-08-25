import React, { FC } from "react";

type Props = {
  data: any;
};

const CourseDetails: FC<Props> = ({ data }) => {
  const discountPercentage = (data?.estimatedPrice - data?.price) / 100;

  console.log("Discount Percentage: ", discountPercentage);

  return <div>CourseDetails</div>;
};

export default CourseDetails;
