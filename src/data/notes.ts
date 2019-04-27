import uuidv1 from 'uuid';
import { DateMaker } from '../app/dateMaker';
import { NotesHelper } from '../app/notesHelper';
import { Note } from '../interfaces/Notes';


const initialDate = new Date(2019, 3, 21);
const endDate = new  Date(); //today
const daysRange: number = 3;

export const notes: Note[] = NotesHelper.makeNotesArray(15, NotesHelper.makeInitialDate(daysRange), endDate);
