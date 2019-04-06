import React, { Component } from 'react';
import './CustomSubmitButton.css'

export interface CustomSubmitButtonProps {
    onClick(): void;
    buttonTitle: string;
}

export class CustomSubmitButton extends React.Component<CustomSubmitButtonProps>{

  render() {
    const { onClick, buttonTitle } = this.props;

    return <button className={'custom-submit-button'}
        onClick={onClick}
    >
    {buttonTitle}
    </button>
  }
}
