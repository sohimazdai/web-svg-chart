import React, { Component } from 'react';
import './CustomUserInput.css'

export interface CustomUserInputProps {
    onChange(e: string): void;
    inputType: string;
    inputValue: string;
}

export class CustomUserInput extends React.Component<CustomUserInputProps>{

  render() {
    const { onChange, inputValue, inputType } = this.props;

    return <input
        className={'custom-user-input'}
        value={inputValue}
        type={inputType}
        onChange={(e) => onChange(e.target.value)}
    />
  }
}
