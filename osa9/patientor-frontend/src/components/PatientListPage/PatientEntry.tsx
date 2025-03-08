import { EntryProps } from "../../types";

const PatientEntry = (props: EntryProps) => {
    const patientDiagnosisCodes = props.details.diagnosisCodes?.map(d => d);
    var diagnoses = [{code: '', name: ''}];
    if (patientDiagnosisCodes) {
       diagnoses = props.diagnoses
            .filter(d => patientDiagnosisCodes.includes(d.code));
    }

    return (
        <div>
            {props.details.date} <i>{props.details.description}</i>
            {props.details.diagnosisCodes && 
            <ul>
                {diagnoses && diagnoses.map((d, index) => <li key={index}>{d.code} {d.name}</li>)}
            </ul>}
        </div>
        );
};

export default PatientEntry;