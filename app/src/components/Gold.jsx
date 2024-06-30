import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const GoldPrices = () => {
    const [goldPrices, setGoldPrices] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoldPrices = async () => {
            try {
                const response = await axios.get(
                    'https://www.goldapi.io/api/XAU/EGP',
                    {
                        headers: {
                            'x-access-token': 'goldapi-2vb0frcsly1kemqh-io',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const prices = {
                    "24k": response.data.price_gram_24k,
                    "22k": response.data.price_gram_22k,
                    "21k": response.data.price_gram_21k,
                    "20k": response.data.price_gram_20k,
                    "18k": response.data.price_gram_18k,
                    "16k": response.data.price_gram_16k,
                    "14k": response.data.price_gram_14k,
                    "10k": response.data.price_gram_10k
                };
                setGoldPrices(prices);
            } catch (err) {
                setError('Error fetching gold prices');
            }
        };
        fetchGoldPrices();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5">Gold Prices (EGP)</Typography>
                        {error ? (
                            <Typography color="error">{error}</Typography>
                        ) : (
                            <Grid container spacing={2}>
                                {Object.keys(goldPrices).map((key) => (
                                    <Grid item xs={6} key={key}>
                                        <Typography variant="body1">{key}:</Typography>
                                        <Typography variant="body1">{goldPrices[key]} EGP per gram</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default GoldPrices;
