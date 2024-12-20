import { ICourse, IUser } from "@/types";

export interface IInitialState {
  user: Object;
  token: string;
}

export interface IRegistrationRes {
  token: string;
  message: string;
}

export interface IRegistrationReq {
  name: string;
  email: string;
  password: string;
}

export interface IActivationRes {
  message: string;
}

export interface IActivationReq {
  token: string;
  activeCode: string;
}

export interface ILoginRes {
  user: Object;
  accessToken: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}

export interface IRefreshTokenRes {
  accessToken: string;
}

export interface IRefreshTokenReq {}

export interface ILoadUserRes {
  user: Object;
  accessToken: string;
}

export interface ILoadUserReq {}

export interface ILogoutRes {
  message: string;
}

export interface ILogoutReq {}

export interface ISocialAuthRes {
  user: Object;
  accessToken: string;
}

export interface ISocialAuthReq {
  name: string;
  email: string;
  avatar: string;
}

export interface IUpdateAvatarReq {
  avatar: string;
}

export interface IUpdateAvatarRes {
  user: Object;
}

export interface IEditProfileRes {
  user: Object;
}

export interface IEditProfileReq {
  name: string;
  email: string;
}

export interface IChangePasswordRes {
  user: Object;
}

export interface IChangePasswordReq {
  oldPassword: string;
  newPassword: string;
}

export interface ICreateCourseRes extends ICourse {}

export interface ICreateCourseReq extends ICourse {}

export interface IGetAllCoursesRes {
  courses: ICourse[];
}

export interface IGetAllCoursesReq {}

export interface IGetAllUsersRes {
  users: IUser[];
}

export interface IGetAllUsersReq {}

export interface IUpdateUserRoleRes {
  user: IUser;
}

export interface IUpdateUserRoleReq {
  email: string;
  role: string;
}

export interface IDeleteUserRes {}

export interface IDeleteUserReq {}

export interface IDeleteCourseRes {}

export interface IDeleteCourseReq {}

export interface IEditCourseRes {
  course: ICourse;
}

export interface IEditCourseReq {
  id: string;
  course: ICourse;
}

interface IBanner {
  img: {
    url: string;
    publicId: string;
  };
  title: string;
  subTitle: string;
}

interface ICategory {
  title: string;
}

interface IFaq {
  question: string;
  answer: string;
}

export interface IGetHeroRes {
  layout: {
    type: string;
    faq: IFaq[];
    banner: IBanner;
    categories: ICategory[];
  };
}

export interface IGetHeroReq {
  type: string;
}

export interface IEditHeroRes {}

export interface IEditHeroReq {
  type: string;
  faq?: IFaq[];
  banner?: IBanner;
  categories?: ICategory[];
}

export interface ICoursesAnalyticsRes {
  course: { month: string; count: number }[];
}

export interface ICoursesAnalyticsReq {}

export interface IOrdersAnalyticsRes {
  order: { month: string; count: number }[];
}

export interface IOrdersAnalyticsReq {}

export interface IUsersAnalyticsRes {
  users: { month: string; count: number }[];
}

export interface IUsersAnalyticsReq {}
