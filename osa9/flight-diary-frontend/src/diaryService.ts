import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const url = 'http://localhost:3000/api/diaries';

const createDiary = (params: NewDiaryEntry) => (
    axios.post<DiaryEntry>(url, params)
);
    

const getAll = () => (
    axios.get<DiaryEntry[]>(url)
);

export default {
    createDiary: createDiary,
    getAll: getAll
};