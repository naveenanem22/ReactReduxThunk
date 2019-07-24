export function getThreeLetterMonthName(monthNumber) {
    switch (monthNumber) {
        case 1:
            return 'Jan';
        case 2:
            return 'Feb';
        case 3:
            return 'Mar';
        case 4:
            return 'Apr';
        case 5:
            return 'May';
        case 6:
            return 'Jun';
        case 7:
            return 'Jul';
        case 8:
            return 'Aug';
        case 9:
            return 'Sep';
        case 10:
            return 'Oct';
        case 11:
            return 'Nov';
        case 12:
            return 'Dec';
    }
}

export function gettwoDigitYear(year){
    year = year+"";//Converting number to string
    return year.substring(2,4);
    
}

export function getLocalTimeStamp(utcTimeStamp)
{
  var d=new Date(utcTimeStamp+" UTC");
  return d.toLocaleString();
}