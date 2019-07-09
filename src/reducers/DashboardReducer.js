import { FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_DATA_FAILURE } from '../actions/ActionTypes';

export function dashboardReducer(state = {}, action) {
    switch (action.type) {

        case FETCH_DASHBOARD_DATA_SUCCESS:
            console.log("Inside success reducer");
            return {
                ...state, isDashboardFormVisible: true, 
                lineGraph: {data: action.payload.lineGraphData},
                barChart: { data: action.payload.barChartData }, 
                pieChart: { data: action.payload.pieChartData },
                lastHourTicketCount: { New: action.payload.lastHourNewTicketCount.ticketCount, Closed: action.payload.lastHourClosedTicketCount.ticketCount }
            };

        case FETCH_DASHBOARD_DATA:
            return {
                ...state, isDashboardFormVisible: false
            };

        case FETCH_DASHBOARD_DATA_FAILURE:
            return state;

        default:
            return state;
    }
}





