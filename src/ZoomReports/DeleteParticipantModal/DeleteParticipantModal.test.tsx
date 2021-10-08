import { duration } from '@mui/material';
import { fireEvent } from '@testing-library/react';
import { render } from 'testUtils';
import { IParticipant } from '../types';
import { DeleteParticipantModal } from './DeleteParticipantModal';

const participant: IParticipant = {
  name: 'Participant name'
}

const closeModal = jest.fn();
const deleteParticipant = jest.fn();

const props = {
  closeModal,
  deleteParticipant,
  isOpened: true,
  participant,
}

describe('DeleteParticipantModal', () => {
  test('Should not render closed modal', () => {
    const closedProps = {
      ...props,
      isOpened: false,
    };
    const { queryByText } = render(<DeleteParticipantModal {...closedProps} />);
    expect(queryByText('Delete Participant')).toBeNull();
  });

  test('Should render modal and participant', () => {
    const { getByText } = render(<DeleteParticipantModal {...props} />);
    expect(getByText('Delete Participant')).toBeInTheDocument();
    expect(getByText(
      `Are you sure you want to delete participant: ${participant.name}?`
    )).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Delete')).toBeInTheDocument();
  });

  test('Should properly close modal', () => {
    const { getByText, queryByText } = render(<DeleteParticipantModal {...props} />);
    fireEvent.click(getByText('Cancel'));
    setTimeout(() => {
      expect(queryByText('Delete Participant')).toBeNull();
    }, duration.leavingScreen);
  });

  test('Should properly trigger delete action', () => {;
    const { getByText } = render(<DeleteParticipantModal {...props} />);
    fireEvent.click(getByText('Delete'));
    expect(deleteParticipant).toBeCalledWith(participant.name);
  });
});
