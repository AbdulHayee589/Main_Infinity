const timeAgo = (createdAt) => {
    const currentTime = new Date();
    const createdAtDate = new Date(createdAt);
    const timeDifference = currentTime - createdAtDate;
  
    const millisecondsInMinute = 60 * 1000;
    const millisecondsInHour = 60 * millisecondsInMinute;
    const millisecondsInDay = 24 * millisecondsInHour;
    const millisecondsInYear = 365.25 * millisecondsInDay; // Average days in a year
  
    const years = Math.floor(timeDifference / millisecondsInYear);
    const days = Math.floor((timeDifference % millisecondsInYear) / millisecondsInDay);
    const hours = Math.floor((timeDifference % millisecondsInDay) / millisecondsInHour);
    const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
  
    let formattedTime = '';
  
    if (years > 0) {
      formattedTime = `${years}y ${days}d`;
    } else if (days > 0) {
      formattedTime = `${days}d ${hours}h`;
    } else if (hours > 0) {
      formattedTime = `${hours}h`;
    } else {
      formattedTime = `${minutes}m`;
    }

    return formattedTime;
};

export default timeAgo;
