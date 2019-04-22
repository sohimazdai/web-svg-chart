import uuidv1 from 'uuid';
import { DateMaker } from '../app/dateMaker';
import { NotesHelper } from '../app/notesHelper';
import { Note } from '../interfaces/Notes';


const initialDate = new Date(2019, 3, 21);
const endDate = new  Date(); //today

export const notes: Note[] = NotesHelper.makeNotesArray(10, initialDate, endDate);
