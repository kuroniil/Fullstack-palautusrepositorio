import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Gender, Entry, PatientInfoParams } from "../../types";
import { useState, useEffect } from "react";
import { Female, Male } from "@mui/icons-material";
import PatientEntry from "./patientEntries";
import NewEntryForm from "./patientEntries/NewEntryForm";

const PatientInfo = (props: PatientInfoParams) => {
    const [patientName, setPatientName] = useState<string>('');
    const [patientGender, setPatientGender] = useState<Gender>(Gender.Other);
    const [patientSsn, setPatientSsn] = useState<string>('');
    const [patientOccupation, setPatientOccupation] = useState<string>('');
    const [entries, setEntries] = useState<Entry[]>([])
    const [pid, setPid] = useState<string>('')
    const tempId = useParams().id;

    useEffect(() => {
        const id = tempId === undefined ? '' : tempId;
        setPid(id)
        patientService.getById(id).then(response => {
            setPatientName(response.name);
            setPatientGender(response.gender);
            const tempSsn = response.ssn
            const ssn = tempSsn === undefined ? '' : tempSsn;
            setPatientSsn(ssn);
            setPatientOccupation(response.occupation);
            setEntries(response.entries)
        });
    }, []);

    const newEntrySubmit = (newEntry: Entry) => {
        setEntries(entries.concat(newEntry));
    };

    return (
        <div>
            <h1>
                {patientName}
                {patientGender === "male" ? <Male />
                : patientGender === "female" ? <Female />
                : ""}
            </h1>
            {patientSsn && <p>ssn: {patientSsn}</p>}
            <p>
                occupation: {patientOccupation}
            </p>
            <details style={{padding: "0.5em", cursor: "pointer"}}>
                <summary>Add new entry</summary>
                <NewEntryForm pid={pid} newEntrySubmit={newEntrySubmit}/>
            </details>
            <h2>entries</h2>
            {entries.map(entry => <PatientEntry key={entry.id} details={entry} 
            diagnoses={props.diagnoses}/>)}
        </div>
    );
};

export default PatientInfo;