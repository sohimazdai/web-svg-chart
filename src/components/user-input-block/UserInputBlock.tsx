import React, { Component } from 'react';
import './UserInputBlock.css'
import { CustomUserInput } from '../custom-inputs/CustomUserInput';
import { CustomSubmitButton } from '../custom-buttons/CustomSubmitButton';
import { LisaComponentState } from '../lisa-component/LisaComponent';

export interface UserInputBlockProps {
    onGlucoseInputValueChange(value: string): void;
    onBreadInputValueChange(value: string): void;
    onInsulinInputValueChange(value: string): void;
    onSaveClick(): void;
    parentState: LisaComponentState;
}

export class UserInputBlock extends React.Component<UserInputBlockProps, any> {
  render() {
    const { glucose, bread, insulin } = this.props.parentState;
    const {
        onGlucoseInputValueChange,
        onBreadInputValueChange,
        onInsulinInputValueChange,
        onSaveClick
    } = this.props;

    return <div className={'user-input-block'}>
      <p>There Is UserInputBlock</p>
      Glucose: <CustomUserInput inputType='number' inputValue={glucose} onChange={onGlucoseInputValueChange} />
      Bread: <CustomUserInput inputType='number' inputValue={bread} onChange={onBreadInputValueChange}/>
      Insulin: <CustomUserInput inputType='number' inputValue={insulin} onChange={onInsulinInputValueChange}/>
      <CustomSubmitButton onClick={onSaveClick} buttonTitle='Press to save' />
    </div>
  }
}
