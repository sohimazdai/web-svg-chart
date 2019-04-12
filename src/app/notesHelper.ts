import { Note } from "../interfaces/Notes";


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

}
