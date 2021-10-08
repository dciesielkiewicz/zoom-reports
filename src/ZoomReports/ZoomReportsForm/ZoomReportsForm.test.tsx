import { act, fireEvent, waitFor } from '@testing-library/react';
import { render } from 'testUtils';
import { ZoomReportsForm } from './ZoomReportsForm';
import { IParticipant } from '../types';

const parseParticipants = jest.fn();
const parsePoll = jest.fn();
const participants: IParticipant[] = [
  { name: 'Participant name' },
];

const createFile = (fileContent: string) => {
  const blob = new Blob([fileContent], { type: 'text/csv;charset=utf-8;' });
  return new File([blob], 'file.csv', { type: 'application/csv' });
}

const participantsFileContent = 'Participants csv file content';
const participantsFile = createFile(participantsFileContent)
const pollFileContent = 'Poll csv file content';
const pollFile = createFile(pollFileContent)

describe('ZoomReportsForm', () => {
  test('Should properly handle participants file upload', async () => {
    const { getByLabelText } = render(
      <ZoomReportsForm
        parseParticipants={parseParticipants}
        parsePoll={parsePoll}
        participants={[]}
      />
    );

    act(() => {
      fireEvent.change(getByLabelText('Participants report'), {
        target: {
          files: [participantsFile],
        },
      });
    });


    await waitFor(() => {
      expect(parseParticipants).toBeCalledWith(participantsFileContent);
    });
  });

  test('Poll upload button should be disabled without participants', async () => {
    const { getByLabelText } = render(
      <ZoomReportsForm
        parseParticipants={parseParticipants}
        parsePoll={parsePoll}
        participants={[]}
      />
    );
    expect(getByLabelText('Poll report').parentNode).toHaveClass('Mui-disabled');
  });

  test('Should properly handle poll file upload', async () => {
    const { getByLabelText, getByText } = render(
      <ZoomReportsForm
        parseParticipants={parseParticipants}
        parsePoll={parsePoll}
        participants={participants}
      />
    );
    expect(getByText('Poll report').parentNode).not.toHaveClass('Mui-disabled');

    act(() => {
      fireEvent.change(getByLabelText('Poll report'), {
        target: {
          files: [pollFile],
        },
      });
    });


    await waitFor(() => {
      expect(parsePoll).toBeCalledWith(pollFileContent);
    });
  });
});
