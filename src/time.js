const time_div = document.getElementById("time");

function updateTime() {
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const day = new Date().getDay();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  time_div.innerHTML = `
  <h4 class="text-subtitle font-russo-one max-sm:text-[16px]"> 
  ${dayNames[day - 1]} ${date} ${monthNames[month]}
  </h4>
    <h2 class="text-title font-russo-one max-sm:text-[38px]">${
      hours < 10 ? `0${hours}` : `${hours}`
    }:${minutes < 10 ? `0${minutes}` : `${minutes}`}</h2>`;
}

updateTime();
setInterval(updateTime, 1000);
