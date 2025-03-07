import { useState, useEffect } from 'react';
import Entry from './components/Entry';
import NewEntryForm from './components/NewEntryForm';
import { DiaryEntry } from './types';
import diaryService from './diaryService';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService
      .getAll()
      .then(response => {
        setDiaryEntries(response.data);
      })
  },[diaryEntries])

  return (
    <div>
      <h2>Add new entry</h2>
      <NewEntryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} />
      <h2>Diary entries</h2>
      {diaryEntries.map(entry =>
        <Entry key={entry.id} entry={entry} />
      )}
    </div>
  );
};

export default App;
