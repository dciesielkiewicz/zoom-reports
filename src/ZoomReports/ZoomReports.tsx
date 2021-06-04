import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useModal } from 'hooks';
import { DeleteParticipantModal } from './DeleteParticipantModal';
import { IParticipant } from './types';
import { useParticipants } from './useParticipants';
import { ZoomReportsForm } from './ZoomReportsForm';
import { ZoomReportsParticipants } from './ZoomReportsParticipants';



export const ZoomReports = () => {
  const { closeModal, isOpened, openModal } = useModal();
  const {
    deleteParticipant,
    participants,
    parseParticipants,
    parsePoll,
    updateParticipant,
  } = useParticipants();
  const [deleteModalParticipant, setDeleteModalParticipant] = useState<IParticipant | undefined>();

  const handleDeleteParticipantClicked = (participant: IParticipant) => () => {
    setDeleteModalParticipant(participant);
    openModal();
  }

  return (
    <>
      <Box mb={4}>
        <Typography variant='h4'>
          Welcome to Attendees Zoom Reports.
        </Typography>
      </Box>
      <Box mb={8}>
        <ZoomReportsForm
          parseParticipants={parseParticipants}
          parsePoll={parsePoll}
          participants={participants}
        />
      </Box>
      <ZoomReportsParticipants
        handleDeleteParticipantClicked={handleDeleteParticipantClicked}
        participants={participants}
        updateParticipant={updateParticipant}
      />
      {deleteModalParticipant && (
        <DeleteParticipantModal
          closeModal={closeModal}
          deleteParticipant={deleteParticipant}
          isOpened={isOpened}
          participant={deleteModalParticipant}
        />
      )}
    </>
  );
};
