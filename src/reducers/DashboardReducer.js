import {FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_DATA_FAILURE} from '../actions/ActionTypes';

export function dashboardReducer(state = {}, action) {
    switch (action.type) {        

        case FETCH_DASHBOARD_DATA_SUCCESS:
            return {
                ...state, barChart: {data:action.payload.barChartData}, pieChart : {data:action.payload.pieChartData},
                lastHourTicketCount: {New: action.payload.lastHourNewTicketCount, Closed: action.payload.lastHourClosedTicketCount}
            };

        case FETCH_DASHBOARD_DATA:
            return state;

        case FETCH_DASHBOARD_DATA_FAILURE:
            return state;

        default:
            return state;
    }
}





