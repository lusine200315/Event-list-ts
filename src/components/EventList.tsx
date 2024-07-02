import { useContext } from "react"
import { EventContext } from "../lib/Context"
import { ActionTypes, IEvent } from "../lib/types";

export const EventList:React.FC = () => {
    const context = useContext(EventContext);

    if(!context) {
        throw new Error("Outside a provider...");
    }

    const {state, dispatch} = context;

    const aaa = (event: IEvent) => {
        dispatch({ type: ActionTypes.currentEvent, payload: event });
        dispatch({ type: ActionTypes.open, payload: true })
    }
 
 return <>
        <h1>Event List</h1>
        <div className="list">
            {
                state.events.map(event => <div key={event.id}>
                    <img src={event.cover} />
                    <p>{event.title}</p>
                    <button onClick={() => aaa(event)}>Edit</button>
                </div>)
            }
        </div>
    </>
}