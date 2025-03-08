import { EntryProps } from "../../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalEntry from './OccupationalEntry';

const PatientEntry = (props: EntryProps) => {
    const patientDiagnosisCodes = props.details.diagnosisCodes?.map(d => d);
    var diagnoses = [{code: '', name: ''}];
    if (patientDiagnosisCodes) {
       diagnoses = props.diagnoses
            .filter(d => patientDiagnosisCodes.includes(d.code));
    }
    
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch (props.details.type) {
        case "HealthCheck":
            return <HealthCheckEntry details={props.details} diagnoses={diagnoses}/>
        case "Hospital":
            return <HospitalEntry details={props.details} diagnoses={diagnoses} />
        case "OccupationalHealthcare":
            return <OccupationalEntry details={props.details} diagnoses={diagnoses} />
        default:
            return assertNever(props.details)
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