import {FETCH_DASHBOARD_DATA, FETCH_DASHBOARD_DATA_SUCCESS, FETCH_DASHBOARD_DATA_FAILURE} from './ActionTypes';
import {showLoadingScreen, dismissLoadingScreen} from './LoadingScreenActions';


export function fetchDashboardData() {
    return {
        type: FETCH_DASHBOARD_DATA
    }
}

export function fetchDashboardDataSuccess() {
    return {
        type: FETCH_DASHBOARD_DATA_SUCCESS
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
            .then((barChartData) => {
                console.log("BarChart data fetched: " + barChartData);
                dispatch(dismissLoadingScreen());
                dispatch(fetchDashboardDataSuccess(barChartData));
            },
            );
    };
}