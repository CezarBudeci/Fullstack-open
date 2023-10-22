import { useState, useEffect } from 'react';
import {
    NewDiary,
    NonSensitiveDiary,
    Visibility,
    Weather,
} from '../types/data/diaryTypes';
import DiaryService from '../services/diariesService';
import { DiaryFormProps } from '../types/components/diaryComponentsTypes';
import axios from 'axios';
import { ValidationError } from '../types/services/diaryServicesTypes';

const DiaryForm = ({ diaries, setDiaries }: DiaryFormProps) => {
    const [date, setDate] = useState<string>('');
    const [visibility, setVisibility] = useState<Visibility | undefined>(
        undefined
    );
    const [weather, setWeather] = useState<Weather | undefined>(undefined);
    const [comment, setComment] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!visibility) {
            displayError('Error: Incorrect visbility', 3000);
            return;
        }

        if (!weather) {
            displayError('Error: Incorrect weather', 3000);
            return;
        }

        const newDiary: NewDiary = {
            date,
            weather: weather as Weather,
            visibility: visibility as Visibility,
            comment,
        };

        DiaryService.storeDiary(newDiary)
            .then(diary => {
                const nonSensitiveDiary: NonSensitiveDiary = {
                    id: diary.id,
                    date: diary.date,
                    weather: diary.weather,
                    visibility: diary.visibility,
                };
                setDiaries(diaries.concat(nonSensitiveDiary));
            })
            .catch(error => {
                if (
                    axios.isAxiosError<
                        ValidationError,
                        Record<string, unknown>
                    >(error)
                ) {
                    displayError(error.response?.request.response, 3000);
                }
            });

        setDate('');
        setComment('');
    };

    const displayError: (value: string, time: number) => void = (
        value: string,
        time: number
    ) => {
        setError(value);
        setTimeout(() => {
            setError('');
        }, time);
    };

    return (
        <div>
            <h2>Add new entry</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div style={inlineStyle}>
                    <label htmlFor="date">date </label>
                    <input
                        type="date"
                        id="date"
                        min="1950-01-01"
                        max="2069-12-31"
                        value={date}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDate(e.target.value)
                        }
                    />
                </div>
                <div style={inlineStyle}>
                    <label htmlFor="visibility">visibility </label>
                    <div id="visibility" style={inlineStyle}>
                        {Object.keys(Visibility).map(key => {
                            return (
                                <div key={key}>
                                    {key}{' '}
                                    <input
                                        type="radio"
                                        name="visibility"
                                        onChange={() =>
                                            setVisibility(
                                                Visibility[
                                                    key as keyof typeof Visibility
                                                ]
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={inlineStyle}>
                    <label htmlFor="weather">weather </label>
                    <div id="weather" style={inlineStyle}>
                        {Object.keys(Weather).map(key => {
                            return (
                                <div key={key}>
                                    {key}{' '}
                                    <input
                                        type="radio"
                                        name="weather"
                                        onChange={() =>
                                            setWeather(
                                                Weather[
                                                    key as keyof typeof Weather
                                                ]
                                            )
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={inlineStyle}>
                    <label htmlFor="comment">comment </label>
                    <input
                        type="text"
                        name="comment"
                        value={comment}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setComment(e.target.value)
                        }
                    />
                </div>
                <div>
                    <input type="submit" value="add" />
                </div>
            </form>
        </div>
    );
};

const inlineStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
};

export default DiaryForm;
