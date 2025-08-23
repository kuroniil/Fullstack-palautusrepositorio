import { Button } from "@mui/material";
import NewHospitalEntryForm from './NewHospitalEntryForm';
import { useState } from "react";
import NewOccupationalEntryForm from "./NewOccupationalEntryForm";
import NewHealthCheckEntryForm from "./NewHealthCheckEntryForm";
import { BaseEntryProps } from "../../../types";

const NewEntryForm = (props: BaseEntryProps) => {
    const [newEntry, setNewEntry] = useState('');
    
    const handleHospitalClick = () => {
        setNewEntry('hospital');
    };

    const handleOccupationalClick = () => {
        setNewEntry('occupational');
    };
    
    const handleHealthCheckClick = () => {
        setNewEntry('health check');
    };

    return (
        <div style={{marginTop: "1em"}}>
            <Button variant="contained" onClick={handleHospitalClick}>Hospital entry</Button>
            <Button style={{marginLeft: "0.5em"}} onClick={handleOccupationalClick} variant="contained">
                Occupational healthcare entry
            </Button>
            <Button onClick={handleHealthCheckClick} style={{marginLeft: "0.5em"}} variant="contained">
                Health check entry
            </Button>
            {newEntry === 'hospital'
            ? <NewHospitalEntryForm 
                setNewEntry={setNewEntry} 
                pid={props.pid} 
                newEntrySubmit={props.newEntrySubmit} 
                />
            : newEntry === 'occupational'
            ? <NewOccupationalEntryForm 
                setNewEntry={setNewEntry} 
                pid={props.pid} 
                newEntrySubmit={props.newEntrySubmit}
                />
            : newEntry === 'health check'
            ? <NewHealthCheckEntryForm 
                setNewEntry={setNewEntry} 
                pid={props.pid} 
                newEntrySubmit={props.newEntrySubmit}
                />
            : ""}
        </div>
    )
}

export default NewEntryForm;