import { Box, Card, CardContent, Chip, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import TimerIcon from '@mui/icons-material/Timer'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const activityIcons = {
  RUNNING: <DirectionsRunIcon fontSize="small" />,
  WALKING: <DirectionsWalkIcon fontSize="small" />,
  CYCLING: <DirectionsBikeIcon fontSize="small" />,
};

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await getActivities();
        if (isMounted) setActivities(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchActivities();
    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
    );
  }

  if (activities.length === 0) {
    return (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography color="text.secondary">
            No activities yet — add your first one above.
          </Typography>
        </Box>
    );
  }

  return (
      <Grid container spacing={2}>
        {activities.map((activity) => (
            <Grid key={activity.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                  variant="outlined"
                  sx={{
                    cursor: 'pointer',
                    height: '100%',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' },
                  }}
                  onClick={() => navigate(`/activities/${activity.id}`)}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
                    {activityIcons[activity.type]}
                    <Chip label={activity.type} size="small" color="primary" variant="outlined" />
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                    <TimerIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {activity.duration} min
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <LocalFireDepartmentIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {activity.caloriesBurned} kcal
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
        ))}
      </Grid>
  )
}

export default ActivityList