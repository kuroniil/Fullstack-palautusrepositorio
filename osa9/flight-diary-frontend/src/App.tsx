import { useState, useEffect } from 'react';
import axios from 'axios';
import Entry from './components/Entry';
import { DiaryEntry } from './types';

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const url = 'http://localhost:3000/api/diaries';

  useEffect(() => {
    axios.get<DiaryEntry[]>(url).then(response => {
      setDiaryEntries(response.data);
    })
  },[])

  return (
    <div>
      <h2>Diary entries</h2>
      {diaryEntries.map(entry =>
        <Entry key={entry.id} entry={entry} />
      )}
    </div>
  );
};

export default App;
