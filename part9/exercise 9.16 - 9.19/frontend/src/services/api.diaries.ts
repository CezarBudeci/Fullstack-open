import axios from 'axios';
import { Diary, NewDiary, NonSensitiveDiary } from '../types/data/diaryTypes';
import { DiaryApiService } from '../types/services/diaryServicesTypes';

const basePath: string = 'http://localhost:3000/';
const diariesPath: string = 'api/diaries';

const getDiaries = (): Promise<Array<NonSensitiveDiary>> => {
    return axios
        .get<Array<NonSensitiveDiary>>(basePath + diariesPath)
        .then(response => response.data as Array<NonSensitiveDiary>);
};

const getDiary = (id: number): Promise<NonSensitiveDiary> => {
    return axios
        .get<NonSensitiveDiary>(`${basePath}${diariesPath}/${id}`)
        .then(response => response.data as NonSensitiveDiary);
};

const storeDiary = (diary: NewDiary): Promise<Diary> => {
    return axios
        .post<Diary>(basePath + diariesPath, diary)
        .then(response => response.data as Diary);
};

const api: DiaryApiService = {
    getDiaries,
    getDiary,
    storeDiary,
};

export default api;
