export interface IEmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: string };
}

export interface IMonthDate {
  month: string;
  count: number;
}
