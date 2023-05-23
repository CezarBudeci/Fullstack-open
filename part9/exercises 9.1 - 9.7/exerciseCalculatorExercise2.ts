import { calculateExcercises } from "./modules/exerciseCalculator";
import { ExercisesStatistics } from "./types/exerciseCalculatorTypes";

const calculateExcercisesWithEnvValues = (): ExercisesStatistics | undefined => {
    const values: Array<string> = process.argv;
    const target = Number(values[2]);
    const dailyHours: Array<number> = [];
    
    try {
        if (isNaN(target)) {
            throw new Error("Target must be a number");
        }

        for (let i = 3; i < values.length; i++) {
            const hours = Number(values[i]);
            
            if (isNaN(hours)) {
                throw new Error("Hours must be a number");
            }
            dailyHours.push(hours);
        }

        return calculateExcercises(dailyHours, target);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return undefined;
    }
};

console.log(calculateExcercisesWithEnvValues());