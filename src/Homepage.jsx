import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import News from './components/News';
import Currency from './components/Currency';
import GoldPrices from './components/Gold';

const HomePage = () => (
    <Container>
        <Grid container spacing={2} >
            <Grid item xs={12} md={7}>
                <News />
            </Grid>
            <Grid item xs={12} md={5}>
                <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                    <Box sx={{ flex: 1, marginBottom: 2 }}>
                        <Currency />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <GoldPrices />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    </Container>
);

export default HomePage;
