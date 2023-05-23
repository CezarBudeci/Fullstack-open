import { CoursePartProps } from '../types/ContentTypes';
import { assertNever } from '../utils/typeUtils';

const Part = ({ coursePart }: CoursePartProps) => {
    switch (coursePart.kind) {
        case 'basic':
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <br />
                        <i>{coursePart.description}</i>
                    </p>
                </div>
            );

        case 'group':
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <br />
                        project exercises {coursePart.groupProjectCount}
                    </p>
                </div>
            );

        case 'background':
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <br />
                        <i>{coursePart.description}</i>
                        <br />
                        submit to {coursePart.backgroundMaterial}
                    </p>
                </div>
            );

        case 'special':
            return (
                <div>
                    <p>
                        <b>
                            {coursePart.name} {coursePart.exerciseCount}
                        </b>
                        <br />
                        <i>{coursePart.description}</i>
                        <br />
                        required skills: {coursePart.requirements.join(', ')}
                    </p>
                </div>
            );

        default:
            assertNever(coursePart);
            return <div></div>;
    }
};

export default Part;
