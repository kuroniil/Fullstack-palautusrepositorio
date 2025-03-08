import { EntryProps } from "../../types";

const PatientEntry = (props: EntryProps) => {
    return (
        <div>
            {props.details.date} <i>{props.details.description}</i>
            {props.details.diagnosisCodes && 
            <ul>
                {props.details.diagnosisCodes.map(d => <li>{d}</li>)}
            </ul>}
        </div>
        );
};

export default PatientEntry;