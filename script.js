const hearts = document.getElementsByClassName("heart");
let count = 0;

// Heart count increase function
for (const heart of hearts) {
  heart.addEventListener("click", function () {
    count++;
    document.getElementById("heart-count").innerText = count;
  });
}

// call button functionalities
const callButtons = document.getElementsByClassName("call-btn");

for (const callButton of callButtons) {
  callButton.addEventListener("click", function () {
    let coinCount = parseInt(document.getElementById("coin-count").innerText);

    if (coinCount < 20) {
      alert("Not enough coins. At least 20 coins needed.");
      return;
    }
    coinCount -= 20;
    document.getElementById("coin-count").innerText = coinCount;

    const card = this.parentElement.parentElement;
    const text = card.getElementsByClassName("service-name")[0].innerText;
    const number = card.getElementsByClassName("call-number")[0].innerText;

    alert(`Calling ${text} ${number}`);

    const callHistory = document.getElementById("call-history");
    const time = new Date().toLocaleTimeString();
    const div = document.createElement("div");
    div.classList.add(
      "bg-[#FAFAFA]",
      "p-4",
      "rounded-lg",
      "justify-between",
      "items-center",
      "mb-4",
      "flex"
    );
    div.innerHTML = `<div>
                      <p class="text-lg mb-2">${text}</p>
                      <p>${number}</p>
                    </div>
                    <div class="text-lg">${time}</div>`;
    callHistory.appendChild(div);
  });
}
