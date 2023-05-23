export interface BmiCategory {
    min: number,
    max: number,
    value: string,
}

export interface BmiResponse {
    weight: number,
    height: number,
    bmi: string
}