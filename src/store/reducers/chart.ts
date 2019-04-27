import { ActionWithPayLoad } from '../../interfaces/Redux';
import { Constants } from '../actions/constants';
import { SectionRange } from '../../components/range-selection/RangeSelection';
import { IChartState } from '../state/state';
import { SelectSectionDirectionType } from '../../interfaces/Chart';

export const initialChartState: IChartState = {
    section: SectionRange.DAY,
    sectionValue: new Date(),
}

export const chartReducer = (state = initialChartState, action: ActionWithPayLoad) => {
    const { sectionValue } = state;
    switch (action.type) {
        case Constants.SELECT_SECTION_WITH_DIRECTION:
            const diff = action.payload == SelectSectionDirectionType.NEXT ? 1 : -1;
            return {
                ...state,
                sectionValue: new Date(
                    state.sectionValue.getFullYear(),
                    sectionValue.getMonth() + 1,
                    sectionValue.getDate() + diff
                ),
            };

        case Constants.SELECT_NOTE:
            return {
                ...state,
                selected: action.payload
            };

        default:
            return state;
    }
}
