import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
    name:"noteSlice",
    initialState: {
        noteList: [],
        accountForm: "",
        userAndAccountId: ""
    },
    reducers: {
        setNoteList: (currentSlice, action) =>{
            currentSlice.noteList = action.payload
        },
        setAccountForm: (currentSlice, action) =>{
            currentSlice.accountForm = action.payload
        },
        setUserAndAccountId: (currentSlice, action) =>{
            currentSlice.userAndAccountId = action.payload
        },
        addNote: (currentSlice, action) => {
            currentSlice.noteList.push(action.payload);
        },
        updateNote: (currentSlice, action) => {
            const indexToUpdate = currentSlice.noteList.findIndex(
                (note) => note.id === action.payload.id
            );
            currentSlice.noteList[indexToUpdate] = action.payload;
        },
        deleteNote: (currentSlice, action) => {
            const filtredNoteList = 
                currentSlice.noteList.filter(note => note.id !== action.payload.id);
            currentSlice.noteList = filtredNoteList;
        }
    }

})

export const noteReducer = noteSlice.reducer;
export const { setNoteList, addNote, updateNote, deleteNote , setAccountForm, setUserAndAccountId} = noteSlice.actions;