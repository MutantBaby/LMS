export interface IUser {
  name?: string;
  role?: string;
  email?: string;
  avatar?: {
    url?: string;
    public_id?: string;
  };
  password?: string;
  isVerified?: boolean;
  isSocialLogin?: boolean;
  signAccessToken?: () => string;
  signRefreshToken?: () => string;
  courses?: Array<{ courseId: string }>;
  compPassword?: (password: string) => Promise<boolean>;
}

export interface ICourse {
  name?: string;
  desc?: string;
  tags?: string;
  price?: number;
  demoUrl?: string;
  rating?: number;
  diffLevel?: string;
  purchased?: number;
  reviews?: ICourReview[];
  courseData?: ICourData[];
  estimatedPrice?: number;
  benefits?: { title?: string }[];
  preRequisites?: { title?: string }[];
  thumbnail?: { publicId?: string; url?: string };
}

export interface ICourData {
  desc?: string;
  title?: string;
  videoUrl?: string;
  links?: ICourLink[];
  suggestion?: string;
  videoSection?: string;
  videoLength?: number;
  videoPlayer?: string;
  questions?: ICourQuestion[];
}

export interface ICourLink {
  url?: string;
  title?: string;
}

export interface ICourQuestion {
  userId?: string;
  question?: string;
  questionReplies?: ICourQuestion[];
}

export interface ICourReview {
  userId?: string;
  rating?: number;
  comment?: string;
  commentReplies?: ICourReview[];
}
