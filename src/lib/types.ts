import { Dispatch } from "react"

export interface IEvent{
    id: string
    title: string
    date: string
    time: string
    type: events
    composer: string
    cover:string
}
export enum events{
    opera,
    ballet
}
export enum FilterTypes {
    all = "all",
    opera = "opera",
    ballet = "ballet"
}
export interface IState{
    events:IEvent[]
    currentFilter:FilterTypes
    open: boolean
    currentEvent: IEvent
}
export enum ActionTypes{
    setEvents,
    addEvent,
    setFilter,
    open,
    currentEvent,
    updateEvent
}
export interface IAction{
    type:ActionTypes,
    payload:unknown
}
export interface IContextType{
    state:IState,
    dispatch: Dispatch<IAction>
}