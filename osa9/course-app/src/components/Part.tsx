import { PartProps } from "../types";

const Part = (props: PartProps) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch (props.part.kind) {
        case "basic":
            return (
                <div>
                    <p>
                        <b>{props.part.name} {props.part.exerciseCount}</b>
                    </p>    
                    <p>
                        <i>{props.part.description}</i>
                    </p>
                </div>
            );
        case "group":
            return (
                <div>
                    <p>
                        <b>{props.part.name} {props.part.exerciseCount}</b>
                    </p>    
                    <p>
                        Group project count: {props.part.groupProjectCount}
                    </p>
                </div>
            );
        case "background":
            return (
                <div>
                    <p>
                        <b>{props.part.name} {props.part.exerciseCount}</b>
                    </p>    
                    <p>
                        <i>{props.part.description}</i>
                    </p>
                    <p>
                        Background material: {props.part.backgroundMaterial}
                    </p>
                </div>
            )
        case "special":
            return (
                <div>
                    <p>
                        <b>{props.part.name} {props.part.exerciseCount}</b>
                    </p>    
                    <p>
                        <i>{props.part.description}</i>
                    </p>
                    <p>
                        required skills: {props.part.requirements.join(", ")}
                    </p>
                </div>
            )
        default:
            return assertNever(props.part);
        };
};

export default Part;