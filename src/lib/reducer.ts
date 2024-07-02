import { ActionTypes, FilterTypes, IAction, IEvent, IState } from "./types";

export const reducer = (state: IState, action: IAction): IState => {
    switch (action.type) {
        case ActionTypes.updateEvent:
            const updatedEventIndex = state.events.findIndex(event => event.id === action.payload.id);

            if (updatedEventIndex !== -1) {
                // Create a new array with the updated event
                const updatedEvents: IEvent[] = [...state.events];
                updatedEvents[updatedEventIndex] = {
                    ...state.events[updatedEventIndex],
                    ...action.payload as IEvent,
                };

                return {
                    ...state,
                    events: updatedEvents,
                };
            }
            return state;
        case ActionTypes.currentEvent: 
            return {
                ...state,
                currentEvent: action.payload as IEvent
            };
        case ActionTypes.open:
            return { 
                ...state,
                open: action.payload as boolean
            };
        case ActionTypes.setEvents:
            return {
                ...state, 
                events: action.payload as IEvent[]
            };
        case ActionTypes.setFilter:
            return {
                ...state,
                currentFilter: action.payload as FilterTypes
            }
        case ActionTypes.addEvent:
            return {
                ...state,
                events: [...state.events, action.payload as IEvent]
            }
        default:
            return state;
    }
};
