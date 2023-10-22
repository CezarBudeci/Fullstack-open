import { NonSensitiveDiary } from '../data/diaryTypes';

export interface DiariesProps {
    diaries: Array<NonSensitiveDiary>;
}

export interface DiaryProps {
    diary: NonSensitiveDiary;
}

export interface DiaryFormProps {
    diaries: Array<NonSensitiveDiary>;
    setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiary[]>>;
}
