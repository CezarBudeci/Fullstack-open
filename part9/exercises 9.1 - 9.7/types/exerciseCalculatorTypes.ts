export interface ExercisesStatistics {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export interface RatingDescription {
    1: string,
    2: string,
    3: string,
}