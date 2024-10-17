function changeDateFormat(date){
    if(date == null){
        return 'Not defined';
    }
    const new_date = date.slice(0, 10);
    const year = date.slice(0, 4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    switch(month){
        case '01': month = 'Jan'; break;
        case '02': month = 'Feb'; break;
        case '03': month = 'Mar'; break;
        case '04': month = 'Apr'; break;
        case '05': month = 'May'; break;
        case '06': month = 'Jun'; break;
        case '07': month = 'Jul'; break;
        case '08': month = 'Aug'; break;
        case '09': month = 'Sep'; break;
        case '10': month = 'Oct'; break;
        case '11': month = 'Nov'; break;
        case '12': month = 'Dec'; break;
    }

    return `${day} ${month} ${year}`;
}

function webFormatTaskDate(date){
    if(!date){
        return "No specified date";
    }
    const year = date.slice(0,4);
    const month = date[5] + date[6];
    const day = date[8] + date[9];

    const hour = date.slice(11, 19);

    return `${day}-${month}-${year.slice(2,4)} : ${hour}`
}

function compareDates_JSONformat(date1, date2){
    
}

function compareNow_JSONformat(JSONdate){
    /*
     * -1 = JSONgreater  
     *  0 = equals dates
     *  1 = NOW greater
     */

    const now = new Date();    
    const input_date = new Date(JSONdate.date);
    if(now == input_date){
        return 0;
    }else if (now < input_date){
        return -1;
    }else{
        return 1;
    }
    
}

export { changeDateFormat, webFormatTaskDate, compareDates_JSONformat, compareNow_JSONformat };
