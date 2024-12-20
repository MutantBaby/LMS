"use client";

import React, { FC } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardWidgets from "./Widgets/DashboardWidgets";

type Props = {
  isDashboard?: boolean;
};

const DashboardHero: FC<Props> = ({ isDashboard }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />

      {isDashboard && <DashboardWidgets open={open} />}
    </div>
  );
};

export default DashboardHero;
