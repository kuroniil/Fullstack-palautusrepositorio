import { Work } from "@mui/icons-material";
import { Card } from "@mui/material";
import { OccupationalHealthcareEntryProps } from "../../../types";

const OccupationalEntry = (props: OccupationalHealthcareEntryProps) => {
    return (
        <Card style={{border: "solid 1px black", marginBottom: "0.5em", padding: "0.5em"}}>
            {props.details.date} <Work /> {props.details.employerName}
            <p>
                <i>{props.details.description}</i> 
            </p>
            {props.details.diagnosisCodes && <h3>diagnoses</h3>}
            {props.details.diagnosisCodes && 
                <ul>
                    {props.diagnoses && props.diagnoses.map((d, index) =>
                    <li key={index}>{d.code} {d.name}</li>)}
                </ul>
            }
            <p>
                diagnose by {props.details.specialist}
            </p>
        </Card>
)};

export default OccupationalEntry;