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
