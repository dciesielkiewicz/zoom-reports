import { ChangeEvent } from 'react';
import {
  Box,
  Button,
  Typography
} from '@material-ui/core';
import { ReportPathInstructions } from 'components';
import { IParticipant } from '../types';

const participantsInstructions = ['Account Management', 'Reports', 'Active Hosts', 'Participants Count', 'Export'];
const pollInstructions = ['Account Management', 'Reports', 'Meeting', 'Poll Report', 'Generate', 'Download'];

interface IZoomReportsFormProps {
  parseParticipants: (csvString: string) => void,
  parsePoll: (csvString: string) => void,
  participants: IParticipant[],
}

export const ZoomReportsForm = ({
  parseParticipants,
  parsePoll,
  participants,
}: IZoomReportsFormProps) => {
  const handleParticipantsFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => parseParticipants(reader.result as string);
    reader.readAsText(file);
  };

  const handlePollFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => parsePoll(reader.result as string);
    reader.readAsText(file);
  };

  return (
    <>
      <Box mb={2}>
        <Typography variant='body1'>Upload participants report</Typography>
        <ReportPathInstructions instructions={participantsInstructions} />
      </Box>
      <Box mb={4}>
        <Button color="primary" component="label" variant="contained">
          Participants report
          <input accept=".csv" hidden type="file" onChange={handleParticipantsFileUpload} />
        </Button>
      </Box>
      <Box mb={2}>
        <Typography variant='body1'>Upload poll report</Typography>
        <ReportPathInstructions instructions={pollInstructions} />
      </Box>
      <Button color="primary" component="label" disabled={participants.length === 0} variant="contained">
        Poll report
        <input accept=".csv" hidden type="file" onChange={handlePollFileUpload} />
      </Button>
    </>
  )
}