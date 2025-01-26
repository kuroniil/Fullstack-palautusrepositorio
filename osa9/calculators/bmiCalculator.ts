import { parseBmiParams, validateBmiParams } from './utils';

const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height / 100)**2;
    if (bmi < 18.5) {
        return "Underweight";
    } else if (18.5 <= bmi && bmi < 25) {
        return "Normal range";
    } else if (25 <= bmi && bmi < 30) {
        return "Overweight";
    } else if (bmi >= 30) {
        return "Obese";
    }
    return "";
};

export const bmiMain = (...args: number[]): string => {
    try {
        if (require.main === module) {
            const [height, weight] = parseBmiParams(process.argv);
             // eslint-disable-next-line no-var
            var [valHeight, valWeight] = validateBmiParams([height, weight]);
        } else {
            const [height, weight] = args;
             // eslint-disable-next-line no-var
            var [valHeight, valWeight] = validateBmiParams([height, weight]);
            return calculateBmi(valHeight, valWeight);
        }
        const bmiTextual = calculateBmi(valHeight, valWeight);
        console.log(bmiTextual);
        return bmiTextual;
    } catch (error: unknown) {
        let errorMessage = "Error: ";
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        console.log(errorMessage);
        return errorMessage;
    }    
};

bmiMain();
