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
