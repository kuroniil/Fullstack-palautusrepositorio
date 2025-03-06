import { ContentProps, CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: ContentProps ) => (
    <div>
        {courseParts.map((part: CoursePart, index: number) => 
            <Part key={index} part={part} />
        )}
    </div>
)


export default Content
