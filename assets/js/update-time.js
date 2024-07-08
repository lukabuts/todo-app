function updateTime() {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  if (prevDays !== day || prevMonths !== month || prevDate !== date) {
    timeDiv.children[0].innerHTML = `${dayNames[day]}, ${date} ${monthNames[month]}`;

    prevDays = day;
    prevMonths = month;
    prevDate = date;
  }

  if (prevHours !== hours || prevMinutes !== minutes) {
    timeDiv.children[1].innerHTML = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}`;

    prevHours = hours;
    prevMinutes = minutes;
  }
}

updateTime();
setInterval(updateTime, 1000);
