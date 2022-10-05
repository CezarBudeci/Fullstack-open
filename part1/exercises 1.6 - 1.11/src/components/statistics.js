import { useEffect, useState } from "react";
import StatisticLine from "./statisticLine";

const Statistics = (props) => {
    const [statistics, setStatistics] = useState({all: 0, average: 0, positive: 0});

    useEffect(() => {
        updateStatistics([props.good, props.neutral, props.bad]);
    }, [props])

    const updateStatistics = (counts) => {
        const newStatistics = {
            all: getSum(counts),
            average: getAvg(counts),
            positive: getPositive(counts)
        }
        setStatistics({...statistics, ...newStatistics});
    }

    const getSum = (counts) => {
        return counts.reduce((partialSum, value) => partialSum + value, 0);
    }

    const getAvg = (counts) => {
        return (counts[0] - counts[2]) / getSum(counts);
    }

    const getPositive = (counts) => {
        return (counts[0] / getSum(counts)) * 100;
    }

    return (
        <div>
            <h2>
                statistics
            </h2>
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                    {
                        props && Object.keys(props).map((key, index) => (
                            <StatisticLine key = {key + index} text = {key} value = {props[key]} />
                        ))
                    }
                    {
                        statistics && Object.keys(statistics).map((key, index) => (
                            <StatisticLine key = {key + index} text = {key} value = {key === 'positive' ? statistics[key] + '%' : statistics[key]} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Statistics;