import React, { Component } from 'react';
import './CustomSubmitButton.css'

export interface CustomSubmitButtonProps {
    onClick(): void;
    buttonTitle: string;
    disabled?: boolean;
}

export class CustomSubmitButton extends React.Component<CustomSubmitButtonProps>{

  render() {
    const { onClick, buttonTitle, disabled } = this.props;

    return <button className={'custom-submit-button'}
        onClick={onClick}
        disabled={disabled}
    >
    {buttonTitle}
    </button>
  }
}
