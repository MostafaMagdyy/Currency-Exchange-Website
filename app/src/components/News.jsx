import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Link } from '@mui/material';

const News = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines',
                    {
                        params: {
                            country: 'eg',
                            apiKey: '5a80618a1ccb4455956c6c9b6cde547e'
                        }
                    }
                );
                setNews(response.data.articles);
                console.log("Hello", response.data.articles);
            } catch (err) {
                setError('Error fetching news');
            }
        };

        fetchNews();
    }, []);

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Latest News</Typography>
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Grid container spacing={3}>
                        {news.map((article, index) => (
                            <Grid item xs={12} sm={6} md={6} key={index}>
                                <Card>
                                    {article.urlToImage && (
                                        <CardMedia
                                            component="img"
                                            alt={article.title}
                                            height="140"
                                            image={article.urlToImage}
                                            title={article.title}
                                        />
                                    )}
                                    <CardContent>
                                        <Link href={article.url} target="_blank" rel="noopener noreferrer">
                                            <Typography variant="h6" component="div">
                                                {article.title}
                                            </Typography>
                                        </Link>
                                        <Typography variant="body2" color="textSecondary" component="div">
                                            {article.author}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default News;
