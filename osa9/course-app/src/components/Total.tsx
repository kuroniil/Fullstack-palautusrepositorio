import { TotalProps } from "../types";

const Total = (props: TotalProps) => (
    <p>
        <br></br>
        Number of exercises: {props.totalExercises}
    </p>
)

export default Total;