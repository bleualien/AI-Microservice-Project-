import { Alert, Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'

const ActivityForm = ({ onActivityAdded }) => {
    const [activity, setActivity] = useState({
        type: "RUNNING", duration: '', caloriesBurned: '',
        additionalMetrics: {}
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);
        try {
            await addActivity(activity);
            onActivityAdded?.();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} });
        } catch (err) {
            console.error(err);
            setError('Could not add activity. Please try again.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Log a new activity</Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Activity Type</InputLabel>
                        <Select
                            label="Activity Type"
                            value={activity.type}
                            onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                        >
                            <MenuItem value="RUNNING">Running</MenuItem>
                            <MenuItem value="WALKING">Walking</MenuItem>
                            <MenuItem value="CYCLING">Cycling</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="Duration (Minutes)"
                        type="number"
                        sx={{ mb: 2 }}
                        value={activity.duration}
                        onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                        inputProps={{ min: 0 }}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Calories Burned"
                        type="number"
                        sx={{ mb: 2 }}
                        value={activity.caloriesBurned}
                        onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
                        inputProps={{ min: 0 }}
                        required
                    />

                    <Button type="submit" variant="contained" disabled={submitting} fullWidth>
                        {submitting ? 'Adding…' : 'Add Activity'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ActivityForm