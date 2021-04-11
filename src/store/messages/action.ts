import {FETCH_MESSAGES_ERROR, FETCH_MESSAGES_REQUEST, FETCH_MESSAGES_SUCCESS, Message, MessagesActionTypes} from "./types";

export function FetchMessagesRequest(): MessagesActionTypes {
  return {
    type: FETCH_MESSAGES_REQUEST
  }
}

export function FetchMessagesSuccess(Messages: Message[]): MessagesActionTypes {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: Messages
  }
}

export function FetchMessagesError(error: string): MessagesActionTypes {
  return {
    type: FETCH_MESSAGES_ERROR,
    payload: error
  }
}
