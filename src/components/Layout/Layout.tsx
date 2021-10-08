import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

import { Background } from '../Background';
import { Header } from '../Header';

interface ILayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => (
  <Background>
    <Header />
    <Container maxWidth="md">
      <Box pt={6} pb={4}>
        {children}
      </Box>
    </Container>
  </Background>
);
