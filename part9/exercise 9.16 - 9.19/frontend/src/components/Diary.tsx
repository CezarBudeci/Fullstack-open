import { DiaryProps } from '../types/components/diaryComponentsTypes';

const Diary = ({ diary }: DiaryProps) => {
    return (
        <div>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
        </div>
    );
};

export default Diary;
