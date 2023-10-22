import { useState } from 'react';
import { HealthCheckRating } from '../../../types';
import {
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
} from '@mui/material';
import { extraEntryFieldsStyle } from '../../../styles/styles';

interface Props {
    selectedHealthRating: string;
    setSelectedHealthRating: React.Dispatch<React.SetStateAction<string>>;
}

const HealthCheckForm: React.FC<Props> = ({
    selectedHealthRating,
    setSelectedHealthRating,
}) => {
    return (
        <div>
            <FormControl variant="standard" style={extraEntryFieldsStyle}>
                <InputLabel id="health-check-rating">
                    Health check rating
                </InputLabel>
                <Select
                    labelId="health-check-rating"
                    value={selectedHealthRating}
                    onChange={event =>
                        setSelectedHealthRating(event.target.value)
                    }
                    required>
                    {Object.keys(HealthCheckRating)
                        .filter(value => isNaN(Number(value)))
                        .map(healthCheckRating => (
                            <MenuItem
                                key={healthCheckRating}
                                value={healthCheckRating}>
                                <ListItemText primary={healthCheckRating} />
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default HealthCheckForm;
