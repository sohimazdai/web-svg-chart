import React, { Dispatch } from 'react';
import './UserDataDisplayBlockComponent.css'
import { List } from '../notes/List';
import { notes } from '../../data/notes';
import { UserInputBlock } from '../user-input-block/UserInputBlock';
import { Note } from '../../interfaces/Notes';
import { connect } from 'react-redux';
import { INotesState, IState, IUserState } from '../../store/state/state';
import { addNoteToList } from '../../store/actions/list';
import { DispatchWithPayload, ActionWithPayLoad } from '../../interfaces/Redux';

export interface UserDataDisplayBlockComponentState {
    glucose: string;
    bread: string;
    insulin: string;
}

export interface UserDataDisplayBlockComponentProps {
    notes: Note[],
    user?: any,
    addNoteToList: (notes: Note[]) => void,
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
    const { notes } = this.props;
    return <div className={'user-data-display-block-component'}>
      <p>There Is LisaComponent</p>
      <UserInputBlock
        parentState={this.state}
        onGlucoseInputValueChange={this.onGlucoseInputValueChange}
        onBreadInputValueChange={this.onBreadInputValueChange}
        onInsulinInputValueChange={this.onInsulinInputValueChange}
        onSaveClick={this.onSaveClick}
      />
      <List notes={notes}/>
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
    const note: Note = {
        glucose: glucose,
        bread: bread,
        insulin: insulin,
    };
    const newNotes = [note, ...this.props.notes];
    (glucose || insulin || bread) && this.props.addNoteToList(newNotes);
    this.setState({
      glucose: '',
      insulin: '',
      bread: '',
    })
  }
}

const mapStateToProps = (store: IState) => {
    console.log(store)
    return {
        notes: store.list.notes
    }
}

const mapDispatchToProps = (dispatch: DispatchWithPayload<ActionWithPayLoad>) => {
  return {
    addNoteToList: (notes: Note[]) => dispatch(addNoteToList(notes)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDataDisplayBlockComponent);
