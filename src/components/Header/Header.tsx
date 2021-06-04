import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        Zoom Reports
      </Typography>
    </Toolbar>
  </AppBar>
);
