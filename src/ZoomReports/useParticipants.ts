import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { parse as parseCsv } from 'papaparse';
import {
  EParticipantHeader,
  EPollHeader,
  IParticipant,
  IParticipantsCsvRow,
  IPollCsvRow,
} from './types';
import { hasCountInName } from './utils';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const parseParticipants = (participantsCsvText: string) => {
    try {
      const {
        data,
        meta: { fields },
      } = parseCsv<IParticipantsCsvRow>(participantsCsvText, {
        header: true,
      });

      const [nameColumnHeader] = fields || [];
      if (nameColumnHeader !== EParticipantHeader.Name) throw Error('Invalid Header');

      const names = data.map(
        ({ [EParticipantHeader.Name]: participantName }: IParticipantsCsvRow) => participantName
      ).filter(Boolean).sort();
      const uniqueNames = [...new Set(names)];
      setParticipants(uniqueNames.map(name => ({ name })));
    } catch (err) {
      enqueueSnackbar('Invalid participants CSV file', {
        variant: 'error',
      });
    }
  }

  const parsePoll = (pollCsvText: string) => {
    if (!participants.length) {
      enqueueSnackbar('Missing participants', {
        variant: 'error',
      });
      return;
    }

    try {
      const [
        // Drop useless CSV rows
        /* eslint-disable @typescript-eslint/no-unused-vars */
        pollReportRow,
        generatedRow,
        topicRow,
        meetingIdRow,
        startTimeRow,
        durationRow,
        pollDetailsRow,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        invalidHeaderRow,
        ...dataRows
      ] = pollCsvText.split('\n').filter(Boolean);
      const headerRow = invalidHeaderRow.replace(/Submitted\sDate\/Time,(.*)/, 'Submitted Date/Time,Answer')
      const {
        data,
        meta: { fields },
      } = parseCsv<IPollCsvRow>([headerRow, ...dataRows].join('\n'), {
        header: true,
      });

      const nameColumnHeader = fields?.[1];
      const answerHeader = fields?.[4];
      if (
        nameColumnHeader !== EPollHeader.Name ||
        answerHeader !== EPollHeader.Answer
      ) throw Error('Invalid Header');

      const updatedParticipants = participants.map((participant) => {
        const pollParticipant = data.find(
          ({ [EPollHeader.Name]: pollParticipantName }) => pollParticipantName === participant.name
        );
        const answer = pollParticipant?.[EPollHeader.Answer];
        const attendeesCount = answer ? parseInt(answer) : undefined;
        return {
          ...participant,
          attendeesCount,
          hasError: !attendeesCount,
          hasCountInName: hasCountInName(participant.name),
        };
      });

      const notMatchedPollAnswers = data.filter(
        ({ [EPollHeader.Name]: pollParticipantName }) => !participants.find(({ name }) => name === pollParticipantName)
      ).map((pollParticipant) => {
        const attendeesCount = parseInt(pollParticipant[EPollHeader.Answer]) || undefined
        const name = pollParticipant[EPollHeader.Name];
        return {
          name,
          attendeesCount,
          hasError: !attendeesCount,
          hasCountInName: hasCountInName(name),
        }
      });

      setParticipants([...updatedParticipants, ...notMatchedPollAnswers]);
    } catch (err) {
      enqueueSnackbar('Invalid poll CSV file', {
        variant: 'error',
      });
    }
  }

  const deleteParticipant = (participantName: IParticipant['name']) => {
    setParticipants(participants.filter(({ name }) => name !== participantName));
  }

  const updateParticipant = async (participant: IParticipant) => {
    const cloneParticipants = [...participants];
    const index = participants.findIndex(({ name }) => name === participant.name);
    cloneParticipants[index] = {
      ...participant,
      hasError: !participant.attendeesCount,
    };
    setParticipants(cloneParticipants);
  }

  return {
    deleteParticipant,
    participants,
    parseParticipants,
    parsePoll,
    updateParticipant,
  };
};
