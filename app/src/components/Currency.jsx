import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import currencyapi from '@everapi/currencyapi-js';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Currency = () => {
    const [usdToEgp, setUsdToEgp] = useState(null);
    const [egpToUsd, setEgpToUsd] = useState(null);
    const [error, setError] = useState(null);
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EGP');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [historicalPrices, setHistoricalPrices] = useState([]);
    const [loadingHistoricalPrices, setLoadingHistoricalPrices] = useState(false);

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

    const fetchHistoricalPrices = async () => {
        setLoadingHistoricalPrices(true);
        try {
            const response = await axios.get(
                'https://api.apilayer.com/currency_data/timeframe',
                {
                    params: {
                        start_date: startDate,
                        end_date: endDate,
                        source: fromCurrency,
                        currencies: toCurrency
                    },
                    headers: {
                        'apikey': '1SlSnAGSoGdqNjL1RdX6yEO0sLuDkiOF',
                        'Content-Type': 'application/json'
                    }
                }
            );
            const prices = response.data.quotes;
            setHistoricalPrices(prices);
        } catch (err) {
            setError('Error fetching historical prices');
        }
        setLoadingHistoricalPrices(false);
    };

    const handleConvert = () => {
        if (amount === '') return;
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

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchHistoricalPrices();
    };

    const formatMonthYear = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('default', { month: 'short' });
    };

    const formatWeekDay = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        return `${day}/${month}`;
    };

    const prepareChartData = () => {
        const dateKeys = Object.keys(historicalPrices);
        if (dateKeys.length === 0) return [];

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const startMonth = startDateObj.getMonth();
        const endMonth = endDateObj.getMonth();

        if (startMonth === endMonth) {
            // Display weekly data if range is within one month
            return dateKeys.map(date => ({
                date: formatWeekDay(date),
                value: historicalPrices[date][`${fromCurrency}${toCurrency}`],
            }));
        } else {
            // Display monthly data if range spans over multiple months
            return dateKeys.map(date => ({
                date: formatMonthYear(date),
                value: historicalPrices[date][`${fromCurrency}${toCurrency}`],
            }));
        }
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Currency Exchange Rates & Historical Gold Prices</Typography>
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
                                    const filteredValue = inputVal.replace(/[^0-9.]/g, '');
                                    setAmount(filteredValue);
                                }}
                                fullWidth
                                margin="normal"
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
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Start Date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <TextField
                                    label="End Date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    style={{ marginTop: '10px' }}
                                >
                                    Fetch Historical Prices
                                </Button>
                            </form>
                        </Grid>
                        {Object.keys(historicalPrices).length > 0 && (
                            <Grid item xs={12}>
                                <Typography variant="h6" style={{ marginTop: '20px' }}>
                                    Historical Prices
                                </Typography>
                                <ResponsiveContainer width="100%" height={400}>
                                    <LineChart data={prepareChartData()}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="value" stroke="#3bca46" activeDot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Grid>
                        )}
                        {loadingHistoricalPrices && (
                            <Grid item xs={12}>
                                <Typography variant="body1">Loading historical prices...</Typography>
                            </Grid>
                        )}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default Currency;
