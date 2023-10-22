import { useState, useEffect } from 'react';
import DiaryService from './services/diariesService';
import { NonSensitiveDiary } from './types/data/diaryTypes';
import Diaries from './components/Diaries';
import DiaryForm from './components/DiaryForm';

function App() {
    const [diaries, setDiaries] = useState<Array<NonSensitiveDiary>>([]);

    useEffect(() => {
        DiaryService.getDiaries().then(data => setDiaries(data));
    }, []);
    return (
        <div className="App">
            <DiaryForm diaries={diaries} setDiaries={setDiaries} />
            <Diaries diaries={diaries} />
        </div>
    );
}

export default App;
