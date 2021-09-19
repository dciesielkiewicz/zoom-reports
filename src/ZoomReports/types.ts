export enum EParticipantHeader {
  Name = 'Name (Original Name)',
  Email = 'User Email',
  JoinTime = 'Join Time',
  LeaveTime = 'Leave Time',
  DurationMinutes = 'Duration (Minutes)',
  Guest = 'Guest',
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