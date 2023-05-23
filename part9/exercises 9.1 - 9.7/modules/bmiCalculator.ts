import { BmiCategory, BmiResponse } from "../types/bmiCalculatorTypes";

export const bmiCategories: Array<BmiCategory> = [
    {
        min: Number.NEGATIVE_INFINITY,
        max: 16,
        value: 'Underweight (Severe thinness)'
    },
    {
        min: 16,
        max: 17,
        value: 'Underweight (Moderate thinness)'
    },
    {
        min: 17,
        max: 18.5,
        value: 'Underweight (Mild thinness)'
    },
    {
        min: 18.5,
        max: 25,
        value: 'Normal range'
    },
    {
        min: 25,
        max: 30,
        value: 'Overweight (Pre-obese)'
    },
    {
        min: 30,
        max: 35,
        value: 'Obese (Class I)'
    },
    {
        min: 35,
        max: 40,
        value: 'Obese (Class II)'
    },
    {
        min: 40,
        max: Number.POSITIVE_INFINITY,
        value: 'Obese (Class III)'
    }
];

export const calculateBmi = (mass: number, height: number): BmiResponse => {
    const heightM = height / 100;
    const bmi =  mass / (heightM * heightM);
    for(let i = 0; i < bmiCategories.length; i++) {
        if (bmi >= bmiCategories[i].min && bmi < bmiCategories[i].max) {
            return {
                weight: mass,
                height,
                bmi: bmiCategories[i].value
            };
           
        }
    }

    return {
        weight: mass,
        height,
        bmi: ''
    };

};