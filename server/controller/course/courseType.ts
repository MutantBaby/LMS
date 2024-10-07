export interface IAddReviewReply {
  comment: string;
  courseId: string;
  reviewId: string;
}

export interface IAddReview {
  userId: string;
  review: string;
  rating: number;
  courseId: string;
}

export interface IAddQuestion {
  question: string;
  courseId: string;
  contentId: string;
}

export interface IAddAnswer {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
