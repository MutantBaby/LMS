export interface IBanner {
  type: string;
  banner: {
    title: string;
    subTitle: string;
    img: {
      url: string;
      publicId: string;
    };
  };
}
