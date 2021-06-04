import { Fragment } from 'react';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(() => ({
  icon: {
    display: 'block',
  }
}));

interface IReportPathInstructionsProps {
  instructions: string[];
}

export const ReportPathInstructions = ({
  instructions,
}: IReportPathInstructionsProps) => {
  const classes = useStyles();
  return (
    <Paper>
      <Box p={1}>
        <Grid container spacing={1}>
          {instructions.map((instruction, index) => (
            <Fragment key={instruction}>
              {index !== 0 && (
                <Grid item>
                  <NavigateNextIcon className={classes.icon} fontSize="small" />
                </Grid>
              )}
              <Grid item>
                <Typography variant="body2">{instruction}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}