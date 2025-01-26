interface ValidExerciseParams {
    valPeriod: number[],
    valTarget: number
};

interface ParsedExerciseParams {
    period: number[],
    target: number
};

export const parseBmiParams = (args: string[]): number[] => {
    if (args.length !== 4) {
        throw new Error("Wrong number of parameters supplied.");
    };
    const height: number = Number(args[2]);
    const weight: number = Number(args[3]);
    
    return [height, weight];
};

export const validateBmiParams = (args: number[]): number[] => {
    const [height, weight] = [args[0], args[1]];
    if (isNaN(Number(height))) {
        throw new Error("Given height is not a number.");
    };
    if (isNaN(Number(weight))) {
        throw new Error("Given weight is not a number.");
    };

    return [height, weight];
};

export const parseExerciseParams = (args: string[]): ParsedExerciseParams => {
    if (args.length < 4) {
        throw new Error("Not enough parameters supplied.");
    } else if (args.length > 50) {
        throw new Error("Too many parameters supplied.");
    };
    const target = Number(args[2]);
    const period = args.slice(3).map(a => Number(a));
    return { "period": period, "target": target };
};

export const validateExerciseParams = (target: number, period: number[]): ValidExerciseParams => {
    if (period.includes(NaN) || isNaN(Number(target))) {
        throw new Error("malformatted parameters");
    };
    return { "valTarget": target, "valPeriod": period };
};