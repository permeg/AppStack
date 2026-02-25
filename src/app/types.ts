export type ApplicationStatus = 'draft' | 'submitted' | 'in-review' | 'accepted' | 'rejected';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Question {
  id: string;
  question: string;
  response: string;
  tags: Tag[];
}

export interface Application {
  id: string;
  title: string;
  status: ApplicationStatus;
  dateCreated: string;
  questions: Question[];
}
