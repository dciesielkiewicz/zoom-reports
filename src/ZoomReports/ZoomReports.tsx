import { Box, Typography } from '@material-ui/core';
import { useParticipants } from './useParticipants';
import { ZoomReportsForm } from './ZoomReportsForm';
import { ZoomReportsParticipants } from './ZoomReportsParticipants';



export const ZoomReports = () => {
  const {
    participants,
    parseParticipants,
    parsePoll,
  } = useParticipants();

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
      <ZoomReportsParticipants participants={participants} />
    </>
  );
};
