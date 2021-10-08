import { ChangeEvent, useMemo } from 'react';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import classNames from 'classnames';
import { IParticipant } from '../types';
import { MAX_COUNT } from '../utils';

const useStyles = makeStyles(({ palette, spacing }) => ({
  errorRow: {
    backgroundColor: palette.error.light,
  },
  hasCountRow: {
    backgroundColor: palette.warning.light,
  },
  warningIcon: {
    display: 'block',
  },
  attendeesCountColumn: {
    display: 'block',
    fontSize: '0.875rem',
    textAlign: 'center',
    width: 125,
    margin: 'auto'
  },
  deleteButton: {
    padding: spacing(1),
  }
}));

interface IZoomReportsParticipantsProps {
  handleDeleteParticipantClicked: (participant: IParticipant) => () => void;
  participants: IParticipant[];
  updateParticipant: (participant: IParticipant) => void;
}

export const ZoomReportsParticipants = ({
  handleDeleteParticipantClicked,
  participants,
  updateParticipant,
}: IZoomReportsParticipantsProps) => {
  const classes = useStyles();

  const overallParticipantsCount = useMemo(() => participants.reduce(
    (sum: number, current: IParticipant) => sum + (current.attendeesCount || 0),
    0
  ), [participants]);

  return (
    <>
      {participants.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="Participants table" size="small">
            <TableHead>
              <TableRow>
                <TableCell component="th">
                  Participant name
                </TableCell>
                <TableCell component="th" align="center">
                  <span className={classes.attendeesCountColumn}>
                    Attendees count
                  </span>
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => {
                const handleParticipantAttendeesCountChange = (event: ChangeEvent<HTMLInputElement>) => {
                  updateParticipant({
                    ...participant,
                    attendeesCount: parseInt(event.target.value) || undefined,
                  })
                }
                return (
                  <TableRow
                    key={participant.name}
                    className={classNames({
                      [classes.errorRow]: participant.hasError,
                      [classes.hasCountRow]: participant.hasCountInName,
                    })}
                  >
                    <TableCell>
                      {participant.hasCountInName ? (
                        <Tooltip
                          aria-label="Count in name tooltip"
                          title="Participant has count in name"
                        >
                          <Box>
                            {participant.name}
                          </Box>
                        </Tooltip>
                      ) : participant.name}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        fullWidth
                        inputProps={{
                          className: classes.attendeesCountColumn,
                          min: 0,
                          max: MAX_COUNT,
                        }}
                        placeholder="Attendees count"
                        onChange={handleParticipantAttendeesCountChange}
                        type="number"
                        value={participant.attendeesCount}
                      />
                    </TableCell>
                    <TableCell>
                    <IconButton
                      aria-label="delete"
                      className={classes.deleteButton}
                      onClick={handleDeleteParticipantClicked(participant)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                )
            })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  Overall attendees count
                </TableCell>
                <TableCell align="center">
                  <span className={classes.attendeesCountColumn}>
                    {overallParticipantsCount}
                  </span>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  )
};
