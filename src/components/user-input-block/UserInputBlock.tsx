import React from 'react';
import './UserInputBlock.css';
import { CustomUserInput } from '../custom-inputs/CustomUserInput';
import { CustomSubmitButton } from '../custom-buttons/CustomSubmitButton';
import { UserDataDisplayBlockComponentState } from '../../connected-components/user-data-display-block-component/UserDataDisplayBlockComponent';

export interface UserInputBlockProps {
    onGlucoseInputValueChange(value: string): void;
    onBreadInputValueChange(value: string): void;
    onInsulinInputValueChange(value: string): void;
    onSaveClick(): void;
    onClearAllClick: () => void;
    parentState: UserDataDisplayBlockComponentState;
    isEditingMode: boolean;
};

export class UserInputBlock extends React.Component<UserInputBlockProps, any> {
    render() {
        const { glucose, bread, insulin } = this.props.parentState;
        const {
            onGlucoseInputValueChange,
            onBreadInputValueChange,
            onInsulinInputValueChange,
            onSaveClick,
            isEditingMode,
            onClearAllClick,
        } = this.props;

        const inputsAreEmpty = !glucose && !bread && !insulin;
        const saveButtonTitle = isEditingMode ? 'Save changes' : 'Press to save';
        const clearButtonTitle = 'Clear All';

        return <div className={'user-input-block'}>
                    Glucose: <CustomUserInput
                        inputType='number'
                        inputValue={glucose}
                        onChange={onGlucoseInputValueChange}
                    />
                    Bread: <CustomUserInput
                        inputType='number'
                        inputValue={bread}
                        onChange={onBreadInputValueChange}
                    />
                    Insulin: <CustomUserInput
                        inputType='number'
                        inputValue={insulin}
                        onChange={onInsulinInputValueChange}
                    />
                <div className={'user-input-block_buttons'}>
                    <CustomSubmitButton
                        onClick={onSaveClick}
                        buttonTitle={saveButtonTitle}
                    />
                    <CustomSubmitButton
                        onClick={onClearAllClick}
                        buttonTitle={clearButtonTitle}
                        disabled={inputsAreEmpty}
                    />
                </div>
            </div>
  }
}
