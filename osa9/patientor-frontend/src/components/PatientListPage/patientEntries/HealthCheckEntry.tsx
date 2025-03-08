import { MedicalServices, Favorite } from "@mui/icons-material";
import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { HealthCheckEntryProps } from "../../../types";

const HealthCheckEntry = (props: HealthCheckEntryProps) => {
    const HealthIcon = styled(Favorite)({
        color: 
            props.details.healthCheckRating === 3 ? "red" 
            : props.details.healthCheckRating === 2 ? "orange" 
            : props.details.healthCheckRating === 1 ? "yellow" 
            : "green"
    });

    return (
        <Card style={{border: "solid 1px black", marginBottom: "0.5em", padding: "0.5em"}}>
            {props.details.date} <MedicalServices />
            <p>
                <i>{props.details.description}</i> 
            </p>
            <HealthIcon />
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

export default HealthCheckEntry;