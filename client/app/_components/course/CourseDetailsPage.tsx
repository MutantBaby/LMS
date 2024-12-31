import { FC, useState } from "react";
import { useCourseContentQuery } from "@/app/_redux/features/courses/courseApi";
import Loading from "../Loading";
import Heading from "@/utils/Heading";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useCourseContentQuery({ id });

  console.log("data", data);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {/* <Heading
        description="Learn Online Courses"
        keywords={data?.courses[0].tags as string}
        title={data?.courses[0].name + " - LE-Course"}
      /> */}
    </div>
  );
};

export default CourseDetailsPage;
