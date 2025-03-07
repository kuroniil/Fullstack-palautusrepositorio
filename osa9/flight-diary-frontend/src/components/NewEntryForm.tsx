import { useEffect, useState } from "react";
import { EntryFormProps, NewDiaryEntry, ValidationError } from "../types";
import diaryService from "../diaryService";
import axios from "axios";
import Visibility from "./Visibility";
import Weather from "./Weather";

const NewEntryForm = (props: EntryFormProps) => {
    const [newDate, setNewDate] = useState('');
    const [newVisibility, setNewVisibility] = useState('');
    const [newWeather, setNewWeather] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newEntry, setNewEntry] = useState<NewDiaryEntry>({date: "", visibility: "", weather: ""});
    const [addingError, setAddingError] = useState('');

    useEffect(() => {
        const entry = {
            date: newDate,
            visibility: newVisibility,
            weather: newWeather,
            comment: newComment
        }
        setNewEntry(entry);
    }, [newDate, newVisibility, newWeather, newComment]);

    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (newEntry.date !== "" && newEntry.visibility !== "" && newEntry.weather !== "") {
            diaryService
            .createDiary(newEntry)
            .then(response => {
                props.setDiaryEntries(props.diaryEntries.concat(response.data));
            })
            .catch(error => {
                if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
                    console.log(error);
                    const errorString: string = error.response?.data.toString() || '?';
                    setAddingError(errorString);
                }
            })
            setNewDate('');
            setNewVisibility('');
            setNewWeather('');
            setNewComment('');
            setNewEntry({date: "", visibility: "", weather: ""});
            setAddingError('');
            };
        };

    return (
        <div>
            {addingError && <p style={{color: "red"}}>{addingError}</p> }
            <form onSubmit={entryCreation}>
                <p>date
                    <input required
                    type="date"
                    value={newDate}
                    onChange={(event) => setNewDate(event.target.value)}
                    min="1900-01-01"
                    max="2100-12-31" 
                    />
                </p>
                <Visibility setNewVisibility={setNewVisibility} />
                <Weather setNewWeather={setNewWeather} />
                <p>comment
                    <input 
                    value={newComment}
                    onChange={(event) => setNewComment(event.target.value)}
                    />
                </p>
                <button type="submit">add</button>
            </form>
        </div>
    );
};

export default NewEntryForm;