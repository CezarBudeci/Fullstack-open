import { DiariesProps } from '../types/components/diaryComponentsTypes';
import Diary from './Diary';

const Diaries = ({ diaries }: DiariesProps) => {
    return (
        <div>
            <h2>Diary entries</h2>
            {diaries &&
                diaries.map(diary => <Diary key={diary.id} diary={diary} />)}
        </div>
    );
};

export default Diaries;
