import React, { Component } from 'react';
import './LisaComponent.css'
import { List } from '../notes/List';
import { notes } from '../../data/notes';
import { CustomUserInput } from '../custom-inputs/CustomUserInput';
import { CustomSubmitButton } from '../custom-buttons/CustomSubmitButton';
import { UserInputBlock } from '../user-input-block/UserInputBlock';

export interface Note {
  glucose: string;
  bread: string;
  insulin: string;
}

export interface LisaComponentState {
  glucose: string;
  bread: string;
  insulin: string;
  notes: Note[],
}

export class LisaComponent extends React.Component<any, LisaComponentState> {
  constructor(props: any){
    super(props);
    this.state = {
      glucose: '',
      bread: '',
      insulin: '',
      notes: notes,
    }
  }


  componentDidUpdate(){
    console.log(this.state.notes)
  }
  render() {
    const { glucose, insulin, bread, notes } = this.state;
    return <div className={'lisa-component'}>
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
    const { glucose, insulin, bread, notes } = this.state;
    (glucose || insulin || bread) && this.setState({
      notes: [{
        glucose: glucose,
        bread: bread,
        insulin: insulin,
      }, ...notes],
      glucose: '',
      insulin: '',
      bread: '',
    })
  }
}
