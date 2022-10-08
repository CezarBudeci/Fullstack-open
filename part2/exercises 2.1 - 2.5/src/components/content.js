import Part from "./part";
import Total from "./total";

const Content = ({ parts }) => {
    const total = parts && parts.reduce((total, value) => total + value.exercises, 0);
    return (
        <div>
            {
                parts && parts.map((value) => (
                    <Part key = {value.id} name = {value.name} exercises = {value.exercises} />
                ))
            }
            <Total total = {total} />
        </div>
    )
}

export default Content;