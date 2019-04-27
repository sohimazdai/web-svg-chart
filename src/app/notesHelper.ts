import { Note } from "../interfaces/Notes";
import { DateMaker } from "./dateMaker";
import uuidv1 from "uuid";


export class NotesHelper {

    static sortByDate(notes: Note[]) {
        return notes.sort((a: Note, b: Note) => {
            if(a.date <= b.date) {
                return 1
            } else {
                return -1
            }
        })
    }

    static makeNotesArray (numberOfNotes: number, initialDate: Date, endDate: Date) {
        let notes: Note[] = [];
        for (let stepNumber = 0; stepNumber < numberOfNotes; stepNumber++) {
            notes.push(NotesHelper.makeRandomNote(initialDate, endDate));
        }
        NotesHelper.sortByDate(notes);
        return notes;
    }

    static makeRandomNote (initialDate: Date, endDate: Date) {
        return {
            glucose: Math.ceil(Math.random()*12).toString(),
            insulin: Math.ceil(Math.random()*12).toString(),
            bread: Math.ceil(Math.random()*12).toString(),
            date: DateMaker.makeRandomDate(initialDate, endDate),
            id: uuidv1(),
        }
    }

    static makeInitialDate (range?: number) {
        if (range) {
            return  new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() - range) );
        }
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() );
    }
}
