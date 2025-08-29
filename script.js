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

// clear button functionalities
document.getElementById("clear-button").addEventListener("click", function () {
  const callHistory = document.getElementById("call-history");
  callHistory.innerText = "";
});

// copy button functionalities
const copyButtons = document.getElementsByClassName("copy-btn");
let copyCount = 0;
for (copyButton of copyButtons) {
  copyButton.addEventListener("click", function () {
    const card = this.parentElement.parentElement;
    const number = card.getElementsByClassName("call-number")[0].innerText;
    alert(`Number copied: ${number}`);
    copyCount++;
    document.getElementById("copy-count").innerText = copyCount;
  });
}

// for copying text after clicking copy buton
document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".copy-btn");
  if (!btn) return;

  const card = btn.closest(".card");
  const source = card && card.querySelector("[data-copy]");
  if (!source) return;

  const text = source.innerText.trim();

  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    fallbackCopy(text).catch(() => alert("Sorry, copy failed."));
  }
});

function fallbackCopy(text) {
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();

    try {
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject(new Error("execCommand failed"));
    } catch (e) {
      document.body.removeChild(ta);
      reject(e);
    }
  });
}
