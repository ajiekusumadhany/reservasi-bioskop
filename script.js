const container = document.querySelector(".container");
const movieSelect = document.getElementById("movie");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const pesan = document.querySelector(".pesan");
const batal = document.querySelector(".batal");

populateUI();

let ticketPrice = +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  } else if (e.target.classList.contains("sold")) {
    const seatName = e.target.getAttribute("baris") + e.target.textContent;
    alert("Seat " + seatName + " sudah terisi. Silakan pilih seat lainnya");
  }
});

pesan.addEventListener("click", (e) => {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  for (let i = 0; i < selectedSeat.length; i++) {
    selectedSeat[i].classList.add("sold");
  }
});

batal.addEventListener("click", (e) => {
  const selectedSeat = document.querySelectorAll(".row .seat.selected");
  for (let i = 0; i < selectedSeat.length; i++) {
    selectedSeat[i].classList.remove("selected");
    selectedSeat[i].classList.remove("sold");
  }
  count.innerText = 0;
  total.innerText = 0;
});
updateSelectedCount();
