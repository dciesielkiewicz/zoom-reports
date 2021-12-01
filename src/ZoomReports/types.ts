export enum EParticipantHeader {
  Name = 'Nazwa (nazwa oryginalna)',
  Email = 'Adres e-mail użytkownika',
  JoinTime = 'Czas dołączenia',
  LeaveTime = 'Czas opuszczenia',
  DurationMinutes = 'Czas trwania (minuty)',
  Guest = 'Gość',
}

export interface IParticipantsCsvRow {
  [EParticipantHeader.Name]: string;
  [EParticipantHeader.Email]: string;
  [EParticipantHeader.JoinTime]: string;
  [EParticipantHeader.LeaveTime]: string;
  [EParticipantHeader.DurationMinutes]: string;
  [EParticipantHeader.Guest]: 'Yes' | 'No';
}

export enum EPollHeader {
  Number = '#',
  Name = 'User Name',
  Email = 'User Email',
  SubmittedTime = 'Submitted Date/Time',
  Answer = 'Answer',
}

export interface IPollCsvRow {
  [EPollHeader.Number]: string;
  [EPollHeader.Name]: string;
  [EPollHeader.Email]: string;
  [EPollHeader.SubmittedTime]: string;
  [EPollHeader.Answer]: string;
}

export interface IParticipant {
  name: string;
  attendeesCount?: number;
  hasError?: boolean;
  hasCountInName?: boolean;
}
