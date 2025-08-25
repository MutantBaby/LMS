import { FC, useState } from "react";
import { useSingleCourseContentQuery } from "@/app/_redux/features/courses/courseApi";
import Loading from "../Loading";
import Heading from "@/utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useSingleCourseContentQuery({ id });

  console.log("data", data);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Heading
        description="Learn Online Courses"
        keywords={data?.course.tags as string}
        title={data?.course.name + " - LE-Course"}
      />

      <Header
        activeItems={0}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />

      <CourseDetails data={data?.course} />

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;
