import { FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_DATA_FAILURE } from './ActionTypes';
import { showLoadingScreen, dismissLoadingScreen } from './LoadingScreenActions';
import { getThreeLetterMonthName, gettwoDigitYear } from '../util/CalendarUtil';
import { getValueByKey } from '../util/ArrayUtil';
import { TicketStatus } from '../masterdata/ApplicationMasterData';


export function fetchDashboardData() {
    return {
        type: FETCH_DASHBOARD_DATA
    }
}

export function fetchDashboardDataSuccess(dashboardData) {

    console.log("Raw barChartData: " + JSON.stringify(dashboardData.barChartData));
    console.log("Raw pieChartData: " + JSON.stringify(dashboardData.pieChartData));

    //Processing rawBarChart data to the Component reuqired format
    var processedBarChartData = [];
    var processedBarChartDataItem = {};
    dashboardData.barChartData.forEach(item => {
        processedBarChartDataItem = {
            name: getThreeLetterMonthName(item.month) + "'" + gettwoDigitYear(item.year),
            Closed: getValueByKey(item.dataPoints, TicketStatus.CLOSE),
            Open: getValueByKey(item.dataPoints, TicketStatus.OPEN)
        };
        processedBarChartData.push(processedBarChartDataItem);
    });
    console.log("Processed barChartData: " + JSON.stringify(processedBarChartData));

    //Processing rawPieChart data to the Component reuqired format
    var processedPieChartData = [];
    var processedPieChartDataItem = {};
    dashboardData.pieChartData.forEach(item => {
        processedPieChartDataItem = {
            name: item.departmentName,
            value: item.payload
        };
        processedPieChartData.push(processedPieChartDataItem);
    });
    console.log("Processed pieChartData: " + JSON.stringify(processedPieChartData));

    return {
        type: FETCH_DASHBOARD_DATA_SUCCESS,
        payload: {
            barChartData: processedBarChartData,
            pieChartData: processedPieChartData
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



export function fetchDashboardDataMultipleAPICall() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    var barChartUrl = new URL("http://localhost:8080/v0/dashboard/barChart");
    var pieChartUrl = new URL("http://localhost:8080/v0/dashboard/pieChart");

    return function (dispatch) {
        dispatch(showLoadingScreen());
        dispatch(fetchDashboardData());

        var barChartApiRequest = fetch(barChartUrl, {
            method: 'GET',
            headers: headers
        })
            .then(
                response => {
                    if (response.status === 200)
                        return response.json();
                },
                error => console.log('An error occurred.', error),
            );

        var pieChartApiRequest = fetch(pieChartUrl, {
            method: 'GET',
            headers: headers
        })
            .then(
                response => {
                    if (response.status === 200)
                        return response.json();
                },
                error => console.log('An error occurred.', error),
            );

        var dashboardData = { 'barChartData': [], 'pieChartData': [] };
        Promise.all([barChartApiRequest, pieChartApiRequest]).then(function (values) {
            dashboardData.barChartData = values[0];
            dashboardData.pieChartData = values[1];
            dispatch(dismissLoadingScreen());
            dispatch(fetchDashboardDataSuccess(dashboardData));
        });
    };
}