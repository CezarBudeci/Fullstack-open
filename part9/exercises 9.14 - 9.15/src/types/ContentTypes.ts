interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
    kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}

interface CoursePartBackground extends CoursePartBaseDescription {
    backgroundMaterial: string;
    kind: 'background';
}

interface CoursePartRequirements extends CoursePartBaseDescription {
    requirements: Array<string>;
    kind: 'special';
}

export type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartRequirements;

export interface ContentProps {
    courseParts: Array<CoursePart>;
}

export interface CoursePartProps {
    coursePart: CoursePart;
}
