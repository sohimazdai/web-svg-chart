export enum dateChartTypes {
    INTRADAY = 'INTRADAY',
}

export class ChartHelper {
    static getAxiosXSign(date: Date, type: string) {
        switch (type){
            case dateChartTypes.INTRADAY:
            return date.getTime();

        default:
            return date;
        }
    }
}
