import { LocalHospital } from "@mui/icons-material";
import { Card } from "@mui/material";
import { HospitalEntryProps } from "../../../types";

const HospitalEntry = (props: HospitalEntryProps) => {
    return (
        <Card style={{border: "solid 1px black", marginBottom: "0.5em", padding: "0.5em"}}>
            {props.details.date} <LocalHospital />
            <p>
                <i>{props.details.description}</i> 
            </p>
            discharged from hospital {props.details.discharge.date}
            <p>
                <b>criteria for discharge:</b> {props.details.discharge.criteria}
            </p>
            {props.details.diagnosisCodes && 
            <ul>
                {props.diagnoses && props.diagnoses.map((d, index) =>
                <li key={index}>{d.code} {d.name}</li>)}
            </ul>}
            <p>
                diagnose by {props.details.specialist}
            </p>
        </Card>
)};

export default HospitalEntry;