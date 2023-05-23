import express from 'express';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';
import { NewPatient, NonSensitivePatientEntry, Patient } from './types/Patient';
import { toNewPatient } from './utils/PatientUtil';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
    return res.json(diagnoseService.getEntries()).send();
});

app.get('/api/patients', (_req, res) => {
    return res
        .json(
            patientService
                .getNonSensitiveEntries()
                .map(({ id, name, dateOfBirth, gender, occupation }) => ({
                    id,
                    name,
                    dateOfBirth,
                    gender,
                    occupation,
                }))
        )
        .send();
});

app.post('/api/patients', (req, res) => {
    const newPatient: NewPatient = toNewPatient(req.body);
    const patient: Patient = patientService.addEntry(newPatient);
    const nonSensitivePatient: NonSensitivePatientEntry = {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    };
    return res.json(nonSensitivePatient).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
