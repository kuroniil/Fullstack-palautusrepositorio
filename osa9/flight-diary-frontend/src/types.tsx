export interface DiaryEntry {
    id: number;
    date: string;
    visibility: string;
    weather: string;
};

export interface EntryProps {
    entry: DiaryEntry;
};