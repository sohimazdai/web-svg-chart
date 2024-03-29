import React from 'react';
import './UserDataDisplayBlockComponent.css'
import { List } from '../../components/notes/List';
import { UserInputBlock } from '../../components/user-input-block/UserInputBlock';
import { Note } from '../../interfaces/Notes';
import { connect } from 'react-redux';
import { IState } from '../../store/state/state';
import { selectNote, changeInputsMode, updateNotes, deleteNote } from '../../store/actions/list';
import { DispatchWithPayload, ActionWithPayLoad } from '../../interfaces/Redux';
import uuidv1 from 'uuid';
import { NotesHelper } from '../../app/notesHelper';
import { Chart } from '../../components/chart/Chart';
import { ChartColor } from '../../constants/Colors';
import { RangeSelection } from '../../components/range-selection/RangeSelection';
import { selectSectionWithDirection } from '../../store/actions/chart';
import { SelectSectionDirectionType } from '../../interfaces/Chart';

export interface UserDataDisplayBlockComponentState {
    glucose: string;
    bread: string;
    insulin: string;
}

export interface UserDataDisplayBlockComponentProps {
    notes: Note[],
    selected: string,
    isEditingMode: boolean,
    user?: any,
    sectionValue: Date,
    updateNotes: (notes: Note[]) => void,
    selectNote: (id: string) => void,
    changeInputsMode: () => void,
    deleteNote: (id: string) => void,
    selectSection: (date: Date) => void;
}

export class UserDataDisplayBlockComponent extends React.Component
<UserDataDisplayBlockComponentProps, UserDataDisplayBlockComponentState> {
    constructor(props: UserDataDisplayBlockComponentProps){
    super(props);
    this.state = {
      glucose: '',
      bread: '',
      insulin: '',
    }
  }

  componentDidMount() {
    const now = performance.now();
    const newNotes = NotesHelper.sortByDate(this.props.notes);
    updateNotes(newNotes);
  }

  componentDidUpdate() {
    const { notes } = this.props;
    const now = performance.now();
    const newNotes = NotesHelper.sortByDate(this.props.notes);
    newNotes != notes && updateNotes(newNotes);
  }

  render() {
    const { notes, selected, selectNote, isEditingMode, sectionValue, selectSection } = this.props;
    return <div className={'user-data-display-block-component'}>
      <div className={'user-data-display-block-component__high-row'}>
        <UserInputBlock
          parentState={this.state}
          onGlucoseInputValueChange={this.onGlucoseInputValueChange}
          onBreadInputValueChange={this.onBreadInputValueChange}
          onInsulinInputValueChange={this.onInsulinInputValueChange}
          onSaveClick={this.onSaveClick}
          isEditingMode={isEditingMode}
          onClearAllClick={this.onClearAllClick}
        />
        <List
            notes={notes}
            selected={selected}
            onSelect={this.onSelectNote}
            onEditClick={this.onEditNoteClick}
            onDeleteClick={this.onDeleteClick}
        />
      </div>
      <RangeSelection sectionValue={sectionValue} onSelectAnotherSectionValue={selectSection}/>
      <Chart
          chartStyleProps={{
              axiosStroke: ChartColor.AXIS,
              axiosStrokeWidth: 5,
              dashStroke: ChartColor.DASH,
              dashStrokeWidth: 3,
              netStroke: ChartColor.NET,
              netStrokeWidth: 1,
          }}
          notes={notes}
          selectedDate={sectionValue}
          numberOfDashesOY={12}
          numberOfDashesOX={12}
      />
    </div>
  }

  private onGlucoseInputValueChange = (str: string) => {
    this.setState({
      glucose: str,
    })
  }

  private onBreadInputValueChange = (str: string) => {
    this.setState({
      bread: str,
    })
  }

  private onInsulinInputValueChange = (str: string) => {
    this.setState({
      insulin: str,
    })
  }

  private onSaveClick = () => {
    const { glucose, insulin, bread } = this.state;
    const { isEditingMode, notes, selected, changeInputsMode } = this.props;
    let date: Date = new Date();
    notes.map(item => {
      if (item.id == selected) {
        date = item.date;
      }
    })

    const note: Note = {
        glucose: glucose,
        bread: bread,
        insulin: insulin,
        id: uuidv1(),
        date: date,
    };

    let newNotes: Note[] = notes;

    if ( isEditingMode ) {
      newNotes = notes.map(item => {
          if(item.id == selected) {
            item = note;
          }
        return item
      })
      changeInputsMode();
    } else {
      newNotes = [note, ...notes];
    };

    (glucose || insulin || bread) && this.props.updateNotes(newNotes);

    this.setState({
      glucose: '',
      insulin: '',
      bread: '',
    })
  }

  private onSelectNote = (id: string) => {
    const { selected, selectNote } = this.props;
    id != selected && selectNote(id);
  }

  private onClearAllClick = () => {
    const { changeInputsMode, selectNote } = this.props;
    changeInputsMode();
    this.setState({
      glucose: '',
      bread: '',
      insulin: '',
    })
  }

  private onEditNoteClick = () => {
    const { selected, notes, changeInputsMode } = this.props;
    changeInputsMode();
    notes.map((note: Note) => {
      selected == note.id &&
      this.setState({
        glucose: note.glucose,
        insulin: note.insulin,
        bread: note.bread,
      })
    })
  }

  private onDeleteClick = () => {
    const { selected, deleteNote } = this.props;
    deleteNote(selected)
  }
}
const mapStateToProps = (store: IState) => {
    return {
        notes: store.list.notes,
        selected: store.list.selected,
        isEditingMode: store.list.isEditingMode,
        sectionValue: store.chart.sectionValue,
    }
}

const mapDispatchToProps = (dispatch: DispatchWithPayload<ActionWithPayLoad>) => {
  return {
    updateNotes: (notes: Note[]) => dispatch(updateNotes(notes)),
    selectNote: (id: string) => dispatch(selectNote(id)),
    deleteNote: (id: string) => dispatch(deleteNote(id)),
    changeInputsMode: () => dispatch(changeInputsMode()),
    selectSection: (date: Date) => dispatch(selectSectionWithDirection(date)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDataDisplayBlockComponent);
