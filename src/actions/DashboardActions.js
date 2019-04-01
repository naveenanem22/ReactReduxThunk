import {FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_DATA_FAILURE} from './ActionTypes';
import {showLoadingScreen, dismissLoadingScreen} from './LoadingScreenActions';
import {getThreeLetterMonthName, gettwoDigitYear} from '../util/CalendarUtil';
import {getValueByKey} from '../util/ArrayUtil';
import {TicketStatus} from '../masterdata/ApplicationMasterData';


export function fetchDashboardData() {
    return {
        type: FETCH_DASHBOARD_DATA
    }
}

export function fetchDashboardDataSuccess(barChartData) {
    //Processing rawBarChart data to the Component reuqired format
    console.log("Raw barChartData: "+JSON.stringify(barChartData));
    var processedBarChartData = [];
    var processedBarChartDataItem = {};
    barChartData.forEach(item =>{
      processedBarChartDataItem = {
        name: getThreeLetterMonthName(item.month)+"'"+gettwoDigitYear(item.year),
        uv: getValueByKey(item.dataPoints, TicketStatus.CLOSE),
        pv: getValueByKey(item.dataPoints, TicketStatus.OPEN)        
      };
      processedBarChartData.push(processedBarChartDataItem);
    });
    console.log("Processed barChartData: "+JSON.stringify(processedBarChartData));
    //Sort the barChartData in ascending order of the time
    return {
        type: FETCH_DASHBOARD_DATA_SUCCESS,
        payload:{
            barChartData: processedBarChartData
        }
    }
}


export function fetchDashboardDataFailure() {
    return {
        type: FETCH_DASHBOARD_DATA_FAILURE
    }
}

export function fetchDashboardDataAPICall() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var url = new URL("http://localhost:8080/v0/dashboard/barChart");

    return function (dispatch) {
        dispatch(showLoadingScreen());
        dispatch(fetchDashboardData());
        return fetch(url, {
            method: 'GET',
            headers: headers
        })
            .then(
                response => {
                    if (response.status === 200)
                        return response.json();
                },
                error => console.log('An error occurred.', error),
            )
            .then((barChart) => {
                dispatch(dismissLoadingScreen());
                dispatch(fetchDashboardDataSuccess(barChart));
            },
            );
    };
}