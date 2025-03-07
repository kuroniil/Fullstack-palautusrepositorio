import { VisibilityProps } from "../types";

const Visibility = (props: VisibilityProps) => (
    <p>visiblity 
        great<input
        type="radio"
        value="great"
        name="visibility"
        onChange={(event) => props.setNewVisibility(event.target.value)}
        />
        good<input
        type="radio"
        value="good"
        name="visibility"
        onChange={(event) => props.setNewVisibility(event.target.value)}
        />
        ok<input
        type="radio"
        value="ok"
        name="visibility"
        onChange={(event) => props.setNewVisibility(event.target.value)}
        />
        poor<input
        type="radio"
        value="poor"
        name="visibility"
        onChange={(event) => props.setNewVisibility(event.target.value)}
        />
    </p>
);

export default Visibility;