import React from 'react';
import './RangeSelection.css';
import { SelectSectionDirectionType } from '../../interfaces/Chart';
import { ChartHelper } from '../../app/chartHelper';

export interface RangeSelectionProps {
    sectionValue: Date;
    onSelectAnotherSectionValue: (date: Date) => void
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
                        <div
                            className={'range-selection__button'}
                            onClick={() => {
                                onSelectAnotherSectionValue(
                                    ChartHelper.makeAnotherDateWithDirection(
                                        SelectSectionDirectionType.PREVIOUS,
                                        sectionValue
                                    )
                                )
                            }
                        }>
                            {'<'}
                        </div>
                        <div className={'range-selection__section-title'}>
                            {sectionValue.toDateString()}
                        </div>
                        <div
                            className={'range-selection__button'}
                            onClick={() => {
                                onSelectAnotherSectionValue(
                                    ChartHelper.makeAnotherDateWithDirection(
                                        SelectSectionDirectionType.NEXT,
                                        sectionValue
                                    )
                                )
                            }
                        }>
                            {'>'}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
