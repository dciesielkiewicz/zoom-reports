import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { IParticipant } from '../types';

interface IDeleteParticipantModalProps {
  closeModal: () => void;
  deleteParticipant: (participantName: IParticipant['name']) => void;
  isOpened: boolean;
  participant: IParticipant;
}

export const DeleteParticipantModal = ({
  closeModal,
  deleteParticipant,
  isOpened,
  participant,
}: IDeleteParticipantModalProps) => {

  const confirmDeleteParticipant = () => {
    deleteParticipant(participant.name);
    closeModal();
  };

  return (
    <Dialog open={isOpened} onClose={closeModal} aria-labelledby="delete-participant-title">
      <DialogTitle id="delete-participant-title">
        Delete Participant
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete participant: {participant.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmDeleteParticipant} variant="contained" color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
};
