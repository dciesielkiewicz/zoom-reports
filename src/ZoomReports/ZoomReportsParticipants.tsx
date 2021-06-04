import { useMemo } from 'react';
import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import classNames from 'classnames';
import { IParticipant } from './types';

const useStyles = makeStyles(({ palette }) => ({
  errorRow: {
    backgroundColor: palette.error.light,
  },
  hasCountRow: {
    backgroundColor: palette.warning.light,
  },
  warningIcon: {
    display: 'block',
  }
}));

interface IZoomReportsParticipantsProps {
  participants: IParticipant[];
}

export const ZoomReportsParticipants = ({
  participants,
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
                <TableCell component="th">
                  Attendees count
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.map((participant) => (
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
                  <TableCell>
                    {participant.attendeesCount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  Overall attendees count
                </TableCell>
                <TableCell>
                  {overallParticipantsCount}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  )
};
