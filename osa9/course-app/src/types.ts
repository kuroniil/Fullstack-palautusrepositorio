export interface HeaderProps {
  courseName: string
};

export interface TotalProps {
  totalExercises: number
};

export interface ContentProps {
  courseParts: CoursePart[]
};

export interface PartProps {
  key: number,
  part: CoursePart
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
};

interface CoursePartDescBase extends CoursePartBase {
  description: string;
};

interface CoursePartBasic extends CoursePartDescBase {
  kind: "basic"
};

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
};

interface CoursePartBackground extends CoursePartDescBase {
  backgroundMaterial: string;
  kind: "background"
};

interface CoursePartRequirements extends CoursePartDescBase {
  requirements: string[];
  kind: "special"
};

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;
