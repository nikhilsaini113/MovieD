import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, Button, Typography, Divider, Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Container from '../components/common/Container';
import MediaItem from '../components/common/MediaItem';
import uiConfigs from '../configs/ui.configs';
import favoriteApi from '../api/modules/favorite.api';
import watchlistApi from '../api/modules/watchlist.api';
import reviewApi from '../api/modules/review.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { Link } from 'react-router-dom';
import tmdbConfigs from "../api/configs/tmdb.configs";
import { stringToColor } from "../components/common/TextAvatar";

const MyProfile = () => {
    const [favMedias, setFavMedias] = useState([]);
    const [watchMedias, setWatchMedias] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [favCount, setFavCount] = useState(0);
    const [watchCount, setWatchCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const skip = 4;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const getFavorites = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await favoriteApi.getList();
            dispatch(setGlobalLoading(false));
            if (err) toast.error(err.message);
            if (response) {
                setFavCount(response.length);
                setFavMedias([...response].splice(0, skip));
            }
        }
        const getWatchlist = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await watchlistApi.getList();
            dispatch(setGlobalLoading(false));
            if (err) toast.error(err.message);
            if (response) {
                setWatchCount(response.length);
                setWatchMedias([...response].splice(0, skip));
            }
        }
        const getReviews = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await reviewApi.getList();
            dispatch(setGlobalLoading(false));
            if (err) toast.error(err.message);
            if (response) {
                setReviewCount(response.length);
                setReviews([...response].splice(0, 2));
            }
        }
        const getStuff = async () => {
            await getFavorites();
            await getWatchlist();
            await getReviews();
        };
        getStuff();
    }, []);

    return (
        <div>
            <Box sx={{ ...uiConfigs.style.mainContent, paddingBottom: 2, padding: '20px 0' }}>
                <Container>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Adjusting direction for small screens
                        alignItems: { xs: 'flex-start', sm: 'center' }, // Align avatar to left on small screens
                        justifyContent: 'space-between',
                        backgroundColor: '#6E6E6E',
                        borderRadius: 1,
                        padding: 2,
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                src={stringToColor(user.displayName)}
                                alt={user.displayName.toUpperCase()}
                                sx={{ width: { xs: 120, sm: 80 }, height: { xs: 120, sm: 80 }, bgcolor: stringToColor(user.displayName) }}
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: { xs: 0, sm: 2 } }}>
                                <Typography variant="h5" fontWeight="bold">
                                    {user.displayName}
                                </Typography>
                                <Button variant="contained" color="primary" sx={{ mt: { xs: 1, sm: 0 }, alignSelf: 'flex-end' }}>
                                    Edit Profile
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: { xs: 2, sm: 0 } }}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">{favCount}</Typography>
                                <Typography variant="body2">FAVORITES</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">{watchCount}</Typography>
                                <Typography variant="body2">WATCHLIST</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6">{reviewCount}</Typography>
                                <Typography variant="body2">REVIEWS</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ ...uiConfigs.style.mainContent }}>
                <Container>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2
                    }}>
                        <Typography variant="h5" fontWeight="bold">
                            MY FAVORITES
                        </Typography>
                        <Button
                            component={Link}
                            to="/favorites"
                            variant="contained"
                            color="primary"
                        >
                            View All
                        </Button>
                    </Box>
                    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
                        {favMedias.map((media, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <MediaItem media={media} mediaType={media.mediaType} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ ...uiConfigs.style.mainContent }}>
                <Container>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2
                    }}>
                        <Typography variant="h5" fontWeight="bold">
                            MY WATCHLIST
                        </Typography>
                        <Button
                            component={Link}
                            to="/watchlist"
                            variant="contained"
                            color="primary"
                        >
                            View All
                        </Button>
                    </Box>
                    <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
                        {watchMedias.map((media, index) => (
                            <Grid item xs={6} sm={4} md={3} key={index}>
                                <MediaItem media={media} mediaType={media.mediaType} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Box sx={{ ...uiConfigs.style.mainContent }}>
                <Container>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2
                    }}>
                        <Typography variant="h5" fontWeight="bold">
                            MY REVIEWS
                        </Typography>
                        <Button
                            component={Link}
                            to="/reviews"
                            variant="contained"
                            color="primary"
                        >
                            View All
                        </Button>
                    </Box>
                    <Grid container spacing={2}>
                        {reviews.map((review, index) => (
                            <Grid item xs={12} key={index}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2
                                }}>
                                    <Box sx={{
                                        width: '100px',
                                        height: '150px',
                                        backgroundImage: `url(${tmdbConfigs.posterPath(review.mediaPoster)})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '8px'
                                    }} />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6">{review.mediaTitle}</Typography>
                                        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                                            {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
                                        </Typography>
                                        <Typography variant="body2">{review.content}</Typography>
                                    </Box>
                                </Box>
                                {index !== reviews.length - 1 && <Divider sx={{ my: 2 }} />}
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default MyProfile;
