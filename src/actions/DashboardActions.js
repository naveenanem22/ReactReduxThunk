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
    console.log("Raw lineGraphData: " + JSON.stringify(dashboardData.lineGraphData));
    console.log("Raw barChartData: " + JSON.stringify(dashboardData.barChartData));
    console.log("Raw pieChartData: " + JSON.stringify(dashboardData.pieChartData));
    console.log("lastHourNewTicketCount: " + JSON.stringify(dashboardData.lastHourNewTicketCount));
    console.log("lastHourClosedTicketCount: " + JSON.stringify(dashboardData.lastHourClosedTicketCount));
    console.log("totalTicketCountFromStart:" + JSON.stringify(dashboardData.totalTicketCountFromStart));


    //Processing rawLineGraph data to the Component reuqired format
    var processedLineGraphData = [];
    var processedLineGraphDataItem = {};
    dashboardData.lineGraphData.forEach(item => {
        processedLineGraphDataItem = {
            name: getThreeLetterMonthName(item.month) + "'" + gettwoDigitYear(item.year),
            Closed: getValueByKey(item.dataPoints, TicketStatus.CLOSE),
            Open: getValueByKey(item.dataPoints, TicketStatus.OPEN),
            New: getValueByKey(item.dataPoints, TicketStatus.NEW)
        };
        processedLineGraphData.push(processedLineGraphDataItem);
    });
    console.log("Processed lineGraphData: " + JSON.stringify(processedLineGraphData));

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
            lineGraphData: processedLineGraphData,
            barChartData: processedBarChartData,
            pieChartData: processedPieChartData,
            lastHourNewTicketCount: dashboardData.lastHourNewTicketCount,
            lastHourClosedTicketCount: dashboardData.lastHourClosedTicketCount,
            totalTicketCountFromStart: dashboardData.totalTicketCountFromStart
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
    var url = new URL("http://localhost:8080/v0/ticket-management/dashboard/barChart");

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
    var lineGraphUrl = new URL("http://localhost:8080/v0/ticket-management/dashboard/lineGraph");
    var barChartUrl = new URL("http://localhost:8080/v0/ticket-management/dashboard/barChart");
    var pieChartUrl = new URL("http://localhost:8080/v0/ticket-management/dashboard/pieChart");
    var totalTicketCountFromStartUrl = new URL("http://localhost:8080/v0/ticket-management/dashboard/totalTicketCount");
    var lastHourNewTicketUrl = new URL("http://localhost:8080/v0/ticket-management/dashboard/lasthour/" + TicketStatus.NEW);
    var lastHourClosedTicketUrl = new URL("http://localhost:8080/v0/ticket-management/dashboard/lasthour/" + TicketStatus.CLOSE);

    return function (dispatch) {
        dispatch(showLoadingScreen());
        dispatch(fetchDashboardData());

        var lineGraphApiRequest = fetch(lineGraphUrl, {
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

        var lastHourNewTicketCountApiRequest = fetch(lastHourNewTicketUrl, {
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

        var totalTicketCountFromStartApiRequest = fetch(totalTicketCountFromStartUrl, {
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

        var lastHourClosedTicketCountApiRequest = fetch(lastHourClosedTicketUrl, {
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

        var dashboardData = {
            'lineGraphData': [],
            'barChartData': [],
            'pieChartData': [],
            'lastHourNewTicketCount': 0,
            'lastHourClosedTicketCount': 0,
            'totalTicketCountFromStart': 0
        };
        Promise.all([lineGraphApiRequest,
            barChartApiRequest,
            pieChartApiRequest,
            lastHourNewTicketCountApiRequest,
            lastHourClosedTicketCountApiRequest,
            totalTicketCountFromStartApiRequest]).then(function (values) {
                dashboardData.lineGraphData = values[0];
                dashboardData.barChartData = values[1];
                dashboardData.pieChartData = values[2];
                dashboardData.lastHourNewTicketCount = values[3];
                dashboardData.lastHourClosedTicketCount = values[4];
                dashboardData.totalTicketCountFromStart = values[5];
                dispatch(dismissLoadingScreen());
                dispatch(fetchDashboardDataSuccess(dashboardData));
            });
    };
}