import express from 'express';
import diagnoseService from './services/diagnoseService';
import patientService from './services/patientService';
import { NewPatient, Patient } from './types/Patient';
import { toNewPatient, toNonSensitivePatient } from './utils/PatientUtil';
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    return res.send('pong');
});

app.get('/api/diagnosis', (req, res) => {
    const codes: any = req.query.code;

    if (!codes) {
        return res.json(diagnoseService.getEntries()).send();
    }

    const codesList = codes as Array<string>;

    return res.json(diagnoseService.getEntriesByCode(codesList)).send();
});

app.get('/api/patients', (_req, res) => {
    return res.json(patientService.getNonSensitivePatients()).send();
});

app.get('/api/patients/:id', (req, res) => {
    const id: string = req.params.id;
    return res.json(patientService.getPatient(id)).send();
});

app.post('/api/patients', (req, res) => {
    const newPatient: NewPatient = toNewPatient(req.body);
    const patient: Patient = patientService.addPatient(newPatient);
    return res.json(toNonSensitivePatient(patient)).send();
});

app.post('/api/patients/:id/diagnosis', (req, res) => {
    const patientId: string = req.params.id;

    if (!patientId) {
        return res.status(400).send(`Invalid patient id: ${patientId}`);
    }

    let patient = patientService.getPatient(patientId);

    if (!patient) {
        return res.status(400).send(`Patient not found for id: ${patientId}`);
    }

    const body: any = req.body;

    try {
        patient = patientService.addEntry(patient, body);
        return res.json(patient).json();
    } catch (error: unknown) {
        return res.status(400).send(error instanceof Error && error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
