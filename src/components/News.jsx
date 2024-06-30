import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, CardMedia, Typography, Link } from '@mui/material';

const News = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const [englishNews, arabicNews] = await Promise.all([
                    axios.get(
                        'https://api.thenewsapi.com/v1/news/all',
                        {
                            params: {
                                api_token: 'tpMFPX6GW0LNtp2vBPP97oblH6F6kyUaW9XeN4ON',
                                language: 'en',
                                limit: 10
                            }
                        }
                    ),
                    axios.get(
                        'https://api.thenewsapi.com/v1/news/all',
                        {
                            params: {
                                api_token: 'tpMFPX6GW0LNtp2vBPP97oblH6F6kyUaW9XeN4ON',
                                language: 'ar',
                                limit: 10
                            }
                        }
                    )
                ]);

                const combinedNews = [...englishNews.data.data, ...arabicNews.data.data];
                setNews(combinedNews);
                console.log("Fetched News:", combinedNews);
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
                                    {article.image_url && (
                                        <CardMedia
                                            component="img"
                                            alt={article.title}
                                            height="140"
                                            image={article.image_url}
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
                                            {article.source}
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
