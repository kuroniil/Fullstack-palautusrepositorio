import { EntryProps } from "../types";

const Entry = (props: EntryProps) => {
    return (
        <div style={{padding: "0.1%"}}>
            <p>
                <b>{props.entry.date}</b>
            </p>
            <p>
                visibility: {props.entry.visibility}
            </p>
            <p>
                weather: {props.entry.weather}
            </p>
        </div>
    )
};

export default Entry;