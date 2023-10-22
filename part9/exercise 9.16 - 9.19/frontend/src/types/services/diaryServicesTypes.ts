import { Diary, NewDiary, NonSensitiveDiary } from '../data/diaryTypes';

export interface DiaryApiService {
    getDiaries: () => Promise<Array<NonSensitiveDiary>>;
    getDiary: (id: number) => Promise<NonSensitiveDiary>;
    storeDiary: (diary: NewDiary) => Promise<Diary>;
}

export interface ValidationError {
    message: string;
    errors: Record<string, string[]>;
}
