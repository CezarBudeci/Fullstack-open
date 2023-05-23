import { ContentProps } from '../types/ContentTypes';
import Part from './Part';

const Content = ({ courseParts }: ContentProps) => {
    return (
        <div>
            {courseParts.map(coursePart => (
                <Part key={coursePart.name} coursePart={coursePart} />
            ))}
        </div>
    );
};

export default Content;
