
import { NoteAPI } from "api/note-api";
import { Header } from "components/header/header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { setNoteList } from "store/notes/notes-slice";
import s from "./style.module.css";
export function App() {
  
  return <div>
            <Header />
            <div className={s.workspace}>
              <Outlet />
            </div>
        </div>;
}


