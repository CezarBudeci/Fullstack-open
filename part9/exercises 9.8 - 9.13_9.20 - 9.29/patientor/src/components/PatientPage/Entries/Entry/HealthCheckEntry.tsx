import { useState, useEffect } from 'react';
import { Diagnose, HealthCheckEntry } from '../../../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { blue, green, orange, red, yellow } from '@mui/material/colors';
import DiagnosisCodes from './DiagnosisCodes';

interface Props {
    entry: HealthCheckEntry;
    diagnosis: Array<Diagnose>;
}

interface Color {
    color?: string;
}

const HealthCheckEntryDetails: React.FC<Props> = ({ entry, diagnosis }) => {
    const [color, setColor] = useState<Color>({});

    useEffect(() => {
        switch (entry.healthCheckRating) {
            case 0:
                setColor({ color: green[700] });
                break;
            case 1:
                setColor({ color: yellow[500] });
                break;
            case 2:
                setColor({ color: orange[800] });
                break;
            case 3:
                setColor({ color: red.A700 });
                break;
            default:
                setColor({ color: blue.A700 });
                break;
        }
    }, [entry.healthCheckRating]);

    return (
        <div>
            <p>
                {entry.date}
                <MedicalServicesIcon fontSize="medium" />
            </p>
            <p>
                <i>{entry.description}</i>
            </p>
            <p>
                <FavoriteIcon sx={color} />
            </p>
            {diagnosis && <DiagnosisCodes diagnosis={diagnosis} />}
            <p>diagnose by {entry.specialist}</p>
        </div>
    );
};

export default HealthCheckEntryDetails;
