const input = document.getElementById("input");
const inputParent = input.parentElement.parentElement;
const submit_btn = document.getElementById("submit-btn");
const todo_div = document.getElementById("todos");

let basket = JSON.parse(localStorage.getItem("basket")) || [];

// Daynames
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// MonthNames
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// input listener
input.addEventListener("keydown", (e) => {
  //   Remove red placeholder class
  const redInput = input.classList.contains("placeholder:text-red-500");

  if (redInput) {
    input.classList.remove("placeholder:text-red-500");
    input.classList.remove("specialInput");
    inputParent.classList.remove("border-2");
    inputParent.classList.remove("border-rose-500");
    input.placeholder = "Note";
  }
});

// Submit button function
submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const inpValue = input.value;

  if (inpValue.trim() === "") {
    // Animate every time user clicks
    input.classList.add("specialInput");
    setTimeout(() => {
      input.classList.remove("specialInput");
    }, 500);
    // Show error
    input.classList.add("placeholder:text-red-500");
    inputParent.classList.add("border-2");
    inputParent.classList.add("border-rose-500");
    input.placeholder = "This field is required";
    input.value = "";
    return;
  }
  // Get current date
  const month = new Date().getMonth();
  const date = new Date().getDate();
  const day = new Date().getDay();
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  //   Written Day and Month
  let writtenDay;
  let writtenMonth;
  //   Days
  writtenDay = dayNames[day - 1];

  // Months
  writtenMonth = monthNames[month - 1];

  //   Push changes into basket
  basket.unshift({
    id: crypto.randomUUID(),
    note: inpValue,
    writtenDay,
    date,
    writtenMonth,
    hours,
    minutes,
    day,
    month,
    done: false,
  });
  //   Set Basket to localstorage
  localStorage.setItem("basket", JSON.stringify(basket));
  //   Genetate Todos
  generateTodos();
  //   Clear input value
  input.value = "";
});

function generateTodos() {
  // ! შეცვალე today-ს ვალიუ
  const today = new Date().getDay();
  const thisMonth = new Date().getMonth();
  todo_div.innerHTML =
    basket.length === 0
      ? `<p class="text-center text-gray italic"> Nothing to do</p>`
      : basket
          .map((item) => {
            const currentDay = today === item.day && thisMonth === item.month;
            const yesterday =
              today - 1 === item.day && thisMonth === item.month;
            return `          
  <div id="${item.id}" class="flex justify-between gap-icons max-sm:gap-[10px]">
  <div>
    <h4 class="${
      item.done ? `line-through ` : ``
    }text-blackish font-inter break-all">${item.note}</h4>
    <h5 class="text-gray font-inter">${
      currentDay
        ? `Today, at`
        : yesterday
        ? `Yesterday, at`
        : `${item.writtenDay}, ${item.date} ${item.writtenMonth}`
    } 
    ${item.hours < 10 ? `0${item.hours}` : item.hours}:${
              item.minutes < 10 ? `0${item.minutes}` : item.minutes
            } </h5>
  </div>
  <div class="flex gap-icons items-center max-sm:gap-[8px]">
    <button class="cursor-pointer delete-btn select-none w-icon">
      <img src="imgs/delete.svg" alt="delete" />
    </button>
    <button class="cursor-pointer select-none rounded-full" >
      <div
      class="${
        item.done ? `bg-greenish` : `bg-transparent`
      } border-2 border-greenish w-icon h-icon flex items-center justify-center rounded-full done-btn"
      >
        <img src="imgs/done.svg" class="w-[9px] h-[7px]" alt="done"/>
      </div>
    </button>
  </div>
</div>`;
          })
          .join("");

  const delete_btn = document.querySelectorAll(".delete-btn");
  const done = document.querySelectorAll(".done-btn");

  // DeleteBtn
  for (const btn of delete_btn) {
    btn.addEventListener("click", (e) => {
      const itemId = btn.parentElement.parentElement.id;

      basket = basket.filter((x) => x.id !== itemId);
      localStorage.setItem("basket", JSON.stringify(basket));
      generateTodos();
    });
  }

  // Done Btn
  for (const btn of done) {
    btn.addEventListener("click", () => {
      const itemId = btn.parentElement.parentElement.parentElement.id;

      basket.forEach((element) => {
        if (element.id === itemId) {
          element.done ? (element.done = false) : (element.done = true);
        }
      });

      localStorage.setItem("basket", JSON.stringify(basket));
      generateTodos();
    });
  }
}

generateTodos();
