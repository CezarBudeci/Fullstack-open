import { ExercisesStatistics, RatingDescription } from "../types/exerciseCalculatorTypes";

export const ratingDescription: RatingDescription = {
    1: 'excelent',
    2: 'could be better',
    3: 'horrible'
};

export const calculateExcercises = (trainingHours: Array<number>, target: number): ExercisesStatistics => {
    const exercisesStatistics: ExercisesStatistics = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: "",
        target: 0,
        average: 0
    };

    exercisesStatistics.periodLength = trainingHours.length;
    exercisesStatistics.trainingDays = trainingHours.length;
    exercisesStatistics.target = target;

    const hoursSum = trainingHours.reduce((total, value) => {
        if (value == 0) {
            exercisesStatistics.trainingDays -= 1;
        }

        return total + value;
    });

    exercisesStatistics.average = hoursSum / exercisesStatistics.periodLength;
    exercisesStatistics.success = exercisesStatistics.average >= exercisesStatistics.target;

    if (exercisesStatistics.average < exercisesStatistics.target - 0.4) {
        exercisesStatistics.rating = 3;
    } else if (exercisesStatistics.average >= exercisesStatistics.target - 0.4 && exercisesStatistics.average < exercisesStatistics.target) {
        exercisesStatistics.rating = 2;
    } else {
        exercisesStatistics.rating = 1;
    }

    exercisesStatistics.ratingDescription = ratingDescription[exercisesStatistics.rating as keyof RatingDescription];


    return exercisesStatistics;
};