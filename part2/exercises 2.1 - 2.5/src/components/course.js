import Header from "./header";
import Content from "./content";

const Course = ({ courses }) => {

    return (
        <div>
            {
                courses && courses.map((value) => (
                    <div key = {value.id}>
                        <Header name = {value.name} />
                        <Content parts = {value.parts} />
                    </div>
                ))
            }
        </div>
    )
}

export default Course;