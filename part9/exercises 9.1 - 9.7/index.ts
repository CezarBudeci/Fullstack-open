import express from 'express';
import { RequestError } from './types/ErrorTypes';
import { calculateBmi } from './modules/bmiCalculator';
import { calculateExcercises } from './modules/exerciseCalculator';
const app = express();
app.use(express.json());

const malformattedParameterError: RequestError = {
    error: 'malformatted parameters',
};

const missingParameterError: RequestError = {
    error: 'parameters missing',
};

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const parameters = req.query;
    if (!parameters.height || !parameters.weight) {
        return res.status(400).json(missingParameterError).send();
    }
    const height = Number(parameters.height);
    const weight = Number(parameters.weight);
    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).json(malformattedParameterError).send();
    } else {
        return res.json(calculateBmi(weight, height)).send();
    }
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;

    if (!body) {
        return res.status(400).json(missingParameterError);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = body;
    const hours: Array<number> = [];

    for (const value of Object.values(daily_exercises as Array<number>)) {
        const hour = Number(value);
        if (isNaN(hour)) {
            return res.status(400).json(malformattedParameterError);
        }
        hours.push(hour);
    }

    if (isNaN(Number(target))) {
        return res.status(400).json(malformattedParameterError);
    }

    return res.json(calculateExcercises(hours, target as number)).send();
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
