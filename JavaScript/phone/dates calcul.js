function timeDiffCalc(dateFuture, dateNow) {

    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days

    const days = Math.floor(diffInMilliSeconds / 86400);

    diffInMilliSeconds -= days * 86400;

    console.log('calculated days', days);

    // calculate hours

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;

    diffInMilliSeconds -= hours * 3600;

    console.log('calculated hours', hours);

    // calculate minutes

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;

    diffInMilliSeconds -= minutes * 60;

    console.log('minutes', minutes);

    let difference = '';

    if (days > 0) {

      difference += (days === 1) ? `${days} day, ` : `${days} days, `;

    }

    difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

    return difference;

  }

  console.log(timeDiffCalc(new Date('2019/10/1 04:10:00'), new Date('2019/10/2 18:20:00')));

// the time difference is:

// 1 day, 14 
 





