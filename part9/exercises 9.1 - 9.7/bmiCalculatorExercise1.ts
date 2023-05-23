import { calculateBmi } from "./modules/bmiCalculator";
import { BmiResponse } from "./types/bmiCalculatorTypes";

const calculateBmiWithEnvValues = (): BmiResponse => {
    const values: Array<string> = process.argv;
    const mass = Number(values[2]);
    const height = Number(values[3]);

    try {
        if (isNaN(mass)) {
            throw new Error("Mass must be a number");
        }

        if (isNaN(height)) {
            throw new Error("Height must be a number");
        }

        return calculateBmi(mass, height);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return {
            weight: mass,
            height,
            bmi: ''
        };
    }
    
};

console.log(calculateBmiWithEnvValues());