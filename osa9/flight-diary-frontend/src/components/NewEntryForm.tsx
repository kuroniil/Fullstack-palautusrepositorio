import { useEffect, useState } from "react";
import { EntryFormProps, NewDiaryEntry } from "../types";
import diaryService from "../diaryService";

const NewEntryForm = (props: EntryFormProps) => {
    const [newDate, setNewDate] = useState('');
    const [newVisibility, setNewVisibility] = useState('');
    const [newWeather, setNewWeather] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newEntry, setNewEntry] = useState<NewDiaryEntry>({date: "", visibility: "", weather: ""});

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
                });
        };
        setNewDate('');
        setNewVisibility('');
        setNewWeather('');
        setNewComment('');
        setNewEntry({date: "", visibility: "", weather: ""});
    };
    
    return (
        <form onSubmit={entryCreation}>
            <p>date
                <input required
                value={newDate}
                onChange={(event) => setNewDate(event.target.value)}
                />
            </p>
            <p>visiblity 
                <input required
                value={newVisibility}
                onChange={(event) => setNewVisibility(event.target.value)}
                />
            </p>
            <p>weather
                <input required
                value={newWeather}
                onChange={(event) => setNewWeather(event.target.value)}
                />
            </p>
            <p>comment
                <input 
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                />
            </p>
            <button type="submit">add</button>
      </form>
    );
};

export default NewEntryForm;