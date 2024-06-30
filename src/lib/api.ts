import axios from "axios";
import { FilterTypes, IEvent } from "./types";

type INewEvent = Omit<IEvent, 'id'>;

const URL = 'http://localhost:3004/events';

export const getAllEvents = async (type: FilterTypes = FilterTypes.all): Promise<IEvent[]> => {
    const endpoint = type !== FilterTypes.all ? `${URL}?type=${type}` : URL;
    const response = await axios.get<IEvent[]>(endpoint);
    return response.data;
};

export const postEvent = async (data: INewEvent): Promise<IEvent> => {
    const response = await axios.post<IEvent>(URL, data);
    return response.data;
};
