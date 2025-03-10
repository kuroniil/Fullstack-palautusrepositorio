import { Card, Button, TextField, Alert } from "@mui/material";
import React, { useState } from "react";
import { NewEntryProps, ValidationError } from "../../../types";
import patientService from '../../../services/patients';
import axios from "axios";

const NewHealthCheckEntryForm = (props: NewEntryProps) => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [diagnoses, setDiagnoses] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const diag = diagnoses !== "" ? diagnoses.split(", ") : []
        const entry = await patientService.createEntry({
            description: description,
            date: date,
            specialist: specialist,
            healthCheckRating: rating,
            diagnosisCodes: diag,
            type: "HealthCheck"
        }, props.pid)
        .catch(error => {
            if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                console.log(error)
                if (error.response?.data.error[0].path[0] === 'healthCheckRating') {
                    setErrorMessage(`invalid healthCheckRating: ${error.response?.data.error[0].received}`);
                } else {
                    const errorString = error.response?.data.error[0].message.toString() || '';
                    setErrorMessage(errorString);
                }
                
            };
        });
        if (entry) {
            props.newEntrySubmit(entry);
            setDescription('');
            setDate('');
            setSpecialist('');
            setRating(0);
            setDiagnoses('');
            props.setNewEntry('');
            setErrorMessage('')
        };
    };

    return (
        <div>
            {errorMessage && 
                <Alert severity="error" style={{marginTop: "1em", marginBottom: "1em"}}>
                    {errorMessage}
                </Alert>
            }
            <Card style={{padding: "1em", marginTop: "1em", border: "dotted 2px black"}}>
                <form onSubmit={handleSubmit}>
                    <h3>New HealthCheck entry</h3>
                    <p>
                        Description
                    </p>
                        <TextField style={{width: "100%"}}
                        onChange={({ target }) => setDescription(target.value)}
                        />
                    <p>
                        Date
                    </p>
                    <TextField style={{width: "100%"}}
                        onChange={({ target }) => setDate(target.value)}
                        />
                    <p>
                        Specialist
                    </p>
                    <TextField style={{width: "100%"}}
                        onChange={({ target }) => setSpecialist(target.value)}
                        />
                    <p>
                        HealthCheck rating                    
                    </p>
                    <input type="number" onChange={({ target }) => setRating(parseInt(target.value))} style={{width: "100%", height: "50px"}} />

                    <p>
                        Diagnosis codes
                    </p>
                    <TextField style={{width: "100%"}}
                    onChange={({ target }) => setDiagnoses(target.value)}
                    />
                    <br></br>
                    <br></br>
                    <Button onClick={() => props.setNewEntry('')} variant="contained" color="error">Cancel</Button>
                    <Button type="submit" variant="contained" style={{float: "right"}}>Add</Button>
                </form>
            </Card>
        </div>
    );  
};

export default NewHealthCheckEntryForm;
