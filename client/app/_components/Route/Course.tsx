import { useHeroAllCourseQuery } from "@/app/_redux/features/courses/courseApi";
import { styles } from "@/styles";
import React, { FC } from "react";
import CourseCard from "./CourseCard";

type Props = {};

const Course: FC<Props> = () => {
  const { data } = useHeroAllCourseQuery({});
  const [courses, setCourses] = React.useState<any>([]);

  React.useEffect(() => {
    if (data) setCourses(data?.courses);
  }, [data]);

  return (
    <div className={`w-[90%] 800px:w-[80%] m-auto`}>
      <h1 className={`${styles.label} text-[25px] font-Poppins font-[600]`}>
        Expand Your Career
        <span className="text-black dark:text-white"> Oppertunity</span> <br />
        With Our Courses
      </h1>

      <br />
      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 1500px:grid-cols-4 1500px:grid-[35px] mb-12 border-0">
        {courses?.map((course: any, index: number) => (
          <CourseCard item={course} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Course;
