import { Fragment } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
                <Grid item sx={{ display: 'flex' }}>
                  <NavigateNextIcon className={classes.icon} fontSize="small" />
                </Grid>
              )}
              <Grid item sx={{ display: 'flex' }}>
                <Typography variant="body2">{instruction}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Box>
    </Paper>
  )
}