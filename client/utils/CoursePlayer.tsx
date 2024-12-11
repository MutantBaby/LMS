"use client";

import axios from "axios";
import React, { FC, useEffect } from "react";

type Props = {
  title: string;
  videoUrl: string;
};

const CoursePlayer: FC<Props> = ({ title, videoUrl }) => {
  const [videoData, setVideoData] = React.useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/getVdoCipherOtp`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);
      });
  }, [videoData]);

  return (
    <div style={{ paddingTop: "41%", position: "relative" }}>
      {videoData?.otp && videoData?.playbackInfo !== "" && (
        <>
          <iframe
            style={{
              position: "absolute",
              border: "none",
              top: 0,
              left: 0,
              width: "90%",
              height: "100%",
            }}
            allowFullScreen={true}
            allow="encrypted-media"
            src={`https://player.vdocipher.com/v2/?opt=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=I9Y0ELLGpKC5mfD3`}></iframe>
        </>
      )}
    </div>
  );
};

export default CoursePlayer;
