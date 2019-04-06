import React, { Component } from 'react';
import './UserInputBlock.css'

export class UserInputBlock extends Component {
  state = {
    glucose: '',
    bread: '',
    insulin: '',
    notes: [],
  }


  componentDidUpdate(){
    console.log(this.state.notes)
  }
  render() {
    const { glucose, insulin, bread, notes } = this.state;
    return <div className={'user-input-block'}>
      <p>There Is UserInputBlock</p>
      <input type='number' value={glucose} onChange={(e) => this.onGlucoseInputValueChange(e.target.value)}/>
      <input type='number' value={bread} onChange={(e) => this.onBreadInputValueChange(e.target.value)}/>
      <input type='number' value={insulin} onChange={(e) => this.onInsulinInputValueChange(e.target.value)}/>
      <button onClick={this.onSaveClick}>press to save</button>
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
    this.setState({
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
