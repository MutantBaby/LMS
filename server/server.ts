require("dotenv").config();

import { app } from "app";
import { connectMongodb } from "@database";

app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectMongodb();
});
