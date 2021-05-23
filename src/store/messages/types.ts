import {FileStrapi} from "../../server/types/fileStrapi";

export interface Message {
  id?: number
  key: string
  title: string
  description: string
  position: number
  illustration: FileStrapi
}

export interface messagesState {
  readonly loading: boolean;
  readonly data: Message[];
  readonly errors?: string;
}

export const FETCH_MESSAGES_REQUEST = "@@messages/FETCH_MESSAGES_REQUEST";
export const FETCH_MESSAGES_SUCCESS = "@@messages/FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_ERROR = "@@messages/FETCH_MESSAGES_ERROR";

interface FetchMessagesRequest {
  type: typeof FETCH_MESSAGES_REQUEST
}

interface FetchMessagesSuccess {
  type: typeof FETCH_MESSAGES_SUCCESS
  payload: Message[]
}

interface FetchMessagesError {
  type: typeof FETCH_MESSAGES_ERROR
  payload: string
}

export type MessagesActionTypes = FetchMessagesRequest | FetchMessagesSuccess | FetchMessagesError;
