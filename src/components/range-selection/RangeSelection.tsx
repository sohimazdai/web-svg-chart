import React from 'react';
import './RangeSelection.css';
import { SelectSectionDirectionType } from '../../interfaces/Chart';

export interface RangeSelectionProps {
    sectionValue: Date;
    onSelectAnotherSectionValue: (direction: SelectSectionDirectionType) => void
};

export enum SectionRange {
    DAY = 'day',
    WEEK = 'week',
    PERIOD = 'period',
}

export class RangeSelection extends React.Component<RangeSelectionProps, any> {
    render() {
        const { sectionValue, onSelectAnotherSectionValue } = this.props;
        return (
            <div className={'range-selection'}>

                <div className={'range-selection__changing-box'}>
                    <div className={'range-selection__change-range'}>
                        <select
                            className={'range-selection__select-input'}
                            name="select-period">
                            <option value="day" >Один день</option>
                            <option value="week">Неделя</option>
                            <option value="period">Выбрать период</option>

                        </select>
                    </div>
                    <div className={'range-selection__changing-section-value'}>
                        <div onClick={() => onSelectAnotherSectionValue(SelectSectionDirectionType.PREVIOUS)}>
                            {'<'}
                        </div>
                        <div className={'range-selection__section-title'}>
                            {sectionValue.toDateString()}
                        </div>
                        <div onClick={() => onSelectAnotherSectionValue(SelectSectionDirectionType.NEXT)}>
                            {'>'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
