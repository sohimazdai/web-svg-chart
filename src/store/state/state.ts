import { Note } from "../../interfaces/Notes";
import { SectionRange } from "../../components/range-selection/RangeSelection";

export interface INotesState {
    notes: Note[],
    selected: string,
    isEditingMode: boolean,
}

export interface IUserState {
    name: string
}

export interface IChartState {
    section: SectionRange;
    sectionValue: Date;
    sectionValueStart?: Date;
}

export interface IState {
    list: INotesState,
    user: IUserState,
    chart: IChartState,
}
