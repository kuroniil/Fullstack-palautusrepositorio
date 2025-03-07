export interface DiaryEntry {
    id: number;
    date: string;
    visibility: string;
    weather: string;
    comment?: string;
};

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

export interface EntryProps {
    entry: DiaryEntry;
};

export interface EntryFormProps {
    diaryEntries: DiaryEntry[];
    setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

export interface ValidationError {
    message: string;
    errors: Record<string, string[]>
};
