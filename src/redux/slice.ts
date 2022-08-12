import { createSlice } from '@reduxjs/toolkit'

export type Contact = {
  id: number
  name: string
  number: number
}

type State = {
  contacts: Contact[]
}

const initialState: State = {
  contacts: [],
}

export const mainSlice = createSlice({
  initialState,
  name: 'mainSlice',
  reducers: {
    addContact: (state: State, action) => {
      state.contacts.push(action.payload)
    },
    editContact: (state: State, action) => {
      state.contacts = state.contacts.map((contact) => {
        return contact.id === action.payload.id ? action.payload : contact
      })
      console.log(action)
    },
    removeContact: (state: State, action) => {
      console.log(1123)
      state.contacts = state.contacts.filter((item) =>
        item.id === action.payload ? false : true
      )
    },
  },
})

export const mainSliceActions = mainSlice.actions
