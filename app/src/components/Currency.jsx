import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import currencyapi from '@everapi/currencyapi-js';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
const Currency = () => {
    const [usdToEgp, setUsdToEgp] = useState(null);
    const [egpToUsd, setEgpToUsd] = useState(null);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EGP');
    useEffect(() => {
        const fetchExchangeRates = async () => {
            const client = new currencyapi('cur_live_aQq76TMUmwEt6FA5GulFtbczeDtD3FF96yZuDPpT');
            try {
                const responseUSD = await client.latest({
                    base_currency: 'USD',
                    currencies: 'EGP'
                });
                const responseEGP = await client.latest({
                    base_currency: 'EGP',
                    currencies: 'USD'
                });
                const usdToEgpRate = responseUSD.data.EGP.value;
                const egpToUsdRate = responseEGP.data.USD.value;
                setUsdToEgp(usdToEgpRate);
                setEgpToUsd(egpToUsdRate);
            } catch (err) {
                setError('Error fetching exchange rates');
            }
        };
        fetchExchangeRates();
    }, []);

    const handleConvert = () => {
        console.log("I am here", amount);
        if (amount === '') return;
        console.log("Das")
        if (fromCurrency === 'USD' && usdToEgp) {
            setConvertedAmount(amount * usdToEgp);
        } else if (fromCurrency === 'EGP' && egpToUsd) {
            setConvertedAmount(amount * egpToUsd);
        }
    };
    const toggleConversionDirection = () => {
        const tempFromCurrency = fromCurrency;
        const tempToCurrency = toCurrency;
        setFromCurrency(tempToCurrency);
        setToCurrency(tempFromCurrency);
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Currency Exchange Rates</Typography>
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1">USD/EGP</Typography>
                            <Typography variant="body1">
                                {usdToEgp ? `${usdToEgp.toFixed(4)} EGP per USD` : 'Loading...'}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1">EGP/USD</Typography>
                            <Typography variant="body1">
                                {egpToUsd ? `${egpToUsd.toFixed(4)} USD per EGP` : 'Loading...'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Amount"
                                type="text"
                                value={amount}
                                onChange={(e) => {
                                    const inputVal = e.target.value;
                                    // Filter out non-numeric characters
                                    const filteredValue = inputVal.replace(/[^0-9.]/g, '');
                                    setAmount(filteredValue);
                                }}
                                fullWidth margin="normal"
                            />
                            <Box display="flex" justifyContent="center" alignItems="center" style={{ marginBottom: '10px' }}>
                                <label htmlFor="fromCurrency">{fromCurrency}</label>
                                <Box display="flex" justifyContent="center" alignItems="center" style={{ margin: '0 10px' }}>
                                    <SwapHorizIcon onClick={toggleConversionDirection} style={{ cursor: 'pointer' }} />
                                </Box>
                                <label htmlFor="toCurrency">{toCurrency}</label>
                            </Box>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleConvert}
                                style={{ width: '50%' }}
                            >
                                Calculate
                            </Button>
                            {convertedAmount !== null && (
                                <Typography variant="h6" style={{ marginTop: '20px' }}>
                                    Converted Amount: {convertedAmount.toFixed(4)}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default Currency;
