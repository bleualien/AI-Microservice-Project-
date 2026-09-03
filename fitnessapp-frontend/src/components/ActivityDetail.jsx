import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getActivityDetail } from '../services/api';
import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TimerIcon from '@mui/icons-material/Timer';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchActivityDetail = async () => {
            setLoading(true);
            try {
                const response = await getActivityDetail(id);
                if (isMounted) setActivity(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        fetchActivityDetail();
        return () => { isMounted = false; };
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!activity) {
        return (
            <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography color="text.secondary">Activity not found.</Typography>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/activities')} sx={{ mt: 2 }}>
                    Back to activities
                </Button>
            </Box>
        );
    }

    const hasRecommendation = Boolean(activity.recommendation);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/activities')} sx={{ mb: 2 }}>
                Back to activities
            </Button>

            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="h5">Activity Details</Typography>
                        <Chip label={activity.type} color="primary" />
                    </Stack>
                    <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <TimerIcon fontSize="small" color="action" />
                            <Typography>{activity.duration} minutes</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <LocalFireDepartmentIcon fontSize="small" color="action" />
                            <Typography>{activity.caloriesBurned} kcal</Typography>
                        </Stack>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {new Date(activity.createdAt).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>

            {hasRecommendation && (
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>AI Recommendation</Typography>

                        <Typography variant="h6" sx={{ mt: 2 }}>Analysis</Typography>
                        <Typography paragraph>{activity.recommendation}</Typography>

                        {activity.improvements?.length > 0 && (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6">Improvements</Typography>
                                {activity.improvements.map((improvement, index) => (
                                    <Typography key={index} paragraph>• {improvement}</Typography>
                                ))}
                            </>
                        )}

                        {activity.suggestions?.length > 0 && (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6">Suggestions</Typography>
                                {activity.suggestions.map((suggestion, index) => (
                                    <Typography key={index} paragraph>• {suggestion}</Typography>
                                ))}
                            </>
                        )}

                        {activity.safety?.length > 0 && (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6">Safety Guidelines</Typography>
                                {activity.safety.map((safety, index) => (
                                    <Typography key={index} paragraph>• {safety}</Typography>
                                ))}
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </Box>
    )
}

export default ActivityDetail