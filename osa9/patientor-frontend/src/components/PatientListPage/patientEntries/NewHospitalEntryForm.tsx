import { Card, Button, TextField, Alert, Input, InputLabel, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { NewEntryProps, ValidationError } from "../../../types";
import patientService from '../../../services/patients';
import axios from "axios";
import diagnosisCodes from '../../../../../patientor-backend/data/diagnoses';

const NewHospitalEntryForm = (props: NewEntryProps) => {
	const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnoses, setDiagnoses] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');
	const [dischargeDate, setDischargeDate] = useState<string>('');
	const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
    
    const handleSubmit = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      const entry = await patientService.createEntry({
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnoses,
          type: "Hospital",
          discharge: {date: dischargeDate, criteria: dischargeCriteria}
      }, props.pid)
      .catch(error => {
          if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
              console.log(error)
              const errorString = error.response?.data.error[0].message.toString() || '';
              setErrorMessage(errorString);
              
          };
      });
      if (entry) {
          props.newEntrySubmit(entry);
          setDescription('');
          setDate('');
          setSpecialist('');
          setDiagnoses([]);
          setDischargeDate('');
          setDischargeCriteria('');
          props.setNewEntry('');
          setErrorMessage('')
      };
  };
  const formFieldStyle = {
      paddingTop: "0.5em",
      paddingBottom: "0.5em"
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
                  <h3>New Occupational Healthcare Entry</h3>
                  <div style={formFieldStyle}>
                      <InputLabel>Description</InputLabel>
                      <TextField 
                          style={{width: "100%"}}
                          onChange={({ target }) => setDescription(target.value)}
                          variant="standard"    
                      />
                  </div>
                  <div style={formFieldStyle}>
                      <InputLabel>Specialist</InputLabel>
                      <TextField 
                          style={{width: "100%"}}
                          onChange={({ target }) => setSpecialist(target.value)}
				    	  variant="standard"
                      />
                  </div>
                  <div style={formFieldStyle}>
                      <InputLabel>Diagnosis codes</InputLabel>
                      <Select multiple
                          value={diagnoses}
                          style={{width: "100%"}}
                          onChange={({ target }) => setDiagnoses(diagnoses.concat(target.value))}
                          >
                          {diagnosisCodes.map((d, i) => 
                              <MenuItem 
                                  value={d.code} 
                                  key={i}>{d.code}
                              </MenuItem>)
                          }
                      </Select>
                  </div>
                  <div style={formFieldStyle}>
                      <InputLabel>Date</InputLabel>
                      <Input 
                          type="Date"
                          onChange={({ target }) => setDate(target.value)}
                      />
                  </div>
				  <div>
                      <InputLabel>Discharge</InputLabel>
						<br></br>
						<div style={{paddingLeft: "1em"}}>
                      	<InputLabel>Date of discharge</InputLabel>
						<Input 
                      	  type="Date"
                      	  onChange={({ target }) => setDischargeDate(target.value)}
                      	/>
						<br></br>
						<br></br>
						<InputLabel>Criteria</InputLabel>
						<TextField 
                          style={{width: "100%"}}
                          onChange={({ target }) => setDischargeCriteria(target.value)}
                          variant="standard"    
                        />
					</div>
                </div>
                  <br></br>
                  <br></br>
                  <Button onClick={() => props.setNewEntry('')} variant="contained" color="error">Cancel</Button>
                  <Button type="submit" variant="contained" style={{float: "right"}}>Add</Button>
              </form>
          </Card>
      </div>
  );  
};

export default NewHospitalEntryForm
