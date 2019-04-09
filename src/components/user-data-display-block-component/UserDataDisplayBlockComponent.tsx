import React, { Dispatch } from 'react';
import './UserDataDisplayBlockComponent.css'
import { List } from '../notes/List';
import { notes } from '../../data/notes';
import { UserInputBlock } from '../user-input-block/UserInputBlock';
import { Note } from '../../interfaces/Notes';
import { connect } from 'react-redux';
import { INotesState, IState, IUserState } from '../../store/state/state';
import { selectNote, changeInputsMode, updateNotes } from '../../store/actions/list';
import { DispatchWithPayload, ActionWithPayLoad } from '../../interfaces/Redux';

export interface UserDataDisplayBlockComponentState {
    glucose: string;
    bread: string;
    insulin: string;
}

export interface UserDataDisplayBlockComponentProps {
    notes: Note[],
    selected: number,
    isEditingMode: boolean,
    user?: any,
    updateNotes: (notes: Note[]) => void,
    selectNote: (id: number) => void,
    changeInputsMode: () => void,
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

  render() {
    const { notes, selected, selectNote, isEditingMode } = this.props;
    return <div className={'user-data-display-block-component'}>
      <p>There Is LisaComponent</p>
      <UserInputBlock
        parentState={this.state}
        onGlucoseInputValueChange={this.onGlucoseInputValueChange}
        onBreadInputValueChange={this.onBreadInputValueChange}
        onInsulinInputValueChange={this.onInsulinInputValueChange}
        onSaveClick={this.onSaveClick}
        isEditingMode={isEditingMode}
      />
      <List
          notes={notes}
          selected={selected}
          onSelect={selectNote}
          onEditClick={this.onEditNoteClick}
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

    const note: Note = {
        glucose: glucose,
        bread: bread,
        insulin: insulin,
    };

    let newNotes: Note[] = notes;

    if ( isEditingMode ) {
      newNotes[selected] = note;
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

  private onEditNoteClick = () => {
    const { selected, notes, changeInputsMode } = this.props;
    changeInputsMode();
    notes.map((note: Note, index: number) => {
      selected == index &&
      this.setState({
        glucose: note.glucose,
        insulin: note.insulin,
        bread: note.bread,
      })
    })
  }
}

const mapStateToProps = (store: IState) => {
    console.log(store)
    return {
        notes: store.list.notes,
        selected: store.list.selected,
        isEditingMode: store.list.isEditingMode
    }
}

const mapDispatchToProps = (dispatch: DispatchWithPayload<ActionWithPayLoad>) => {
  return {
    updateNotes: (notes: Note[]) => dispatch(updateNotes(notes)),
    selectNote: (id: number) => dispatch(selectNote(id)),
    changeInputsMode: () => dispatch(changeInputsMode())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDataDisplayBlockComponent);
