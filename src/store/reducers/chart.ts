import { ActionWithPayLoad } from '../../interfaces/Redux';
import { Constants } from '../actions/constants';
import { SectionRange } from '../../components/range-selection/RangeSelection';
import { IChartState } from '../state/state';

export const initialChartState: IChartState = {
    section: SectionRange.DAY,
    sectionValue: new Date(),
}

export const chartReducer = (state = initialChartState, action: ActionWithPayLoad) => {
    switch (action.type) {
        case Constants.SELECT_DATE_SECTION:
            return {
                ...state,
                sectionValue: action.payload,
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
