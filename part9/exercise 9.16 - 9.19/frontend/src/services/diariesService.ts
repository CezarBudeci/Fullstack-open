import { NewDiary } from '../types/data/diaryTypes';
import { Diary, NonSensitiveDiary } from '../types/data/diaryTypes';
import { DiaryApiService } from '../types/services/diaryServicesTypes';
import DiaryApi from './api.diaries';

const getDiaries = (): Promise<Array<NonSensitiveDiary>> => {
    return DiaryApi.getDiaries();
};

const getDiary = (id: number): Promise<NonSensitiveDiary> => {
    return DiaryApi.getDiary(id);
};

const storeDiary = (diary: unknown): Promise<Diary> => {
    let newDiary: NewDiary = diary as NewDiary;
    return DiaryApi.storeDiary(newDiary);
};

const DiaryService: DiaryApiService = {
    getDiaries,
    getDiary,
    storeDiary,
};

export default DiaryService;
