// Gold Price calculator.....
// let currentLang = "en";

const textMap = {
  en: {
    priceTitle: "💎 Gold Ornaments Price Calculator",
    priceKaratLabel: "Select Karat",
    priceLabel: "Gold Price per Vori (৳)",
    voriLabel: "Vori",
    anaLabel: "Ana",
    rotiLabel: "Roti",
    pointLabel: "Point",
    wagesLabel: "Wages per Vori (৳)",
    vatLabel: "VAT (%)",
    calcBtn: "💰 Calculate",
    summaryTitle: "📊 Calculation Summary",
    unitHeader: "Unit",
    qtyHeader: "Quantity",
    priceHeader: "Price (৳)",
    wagesText: "💼 Total Wages: ",
    vatText: "💸 VAT: ",
    totalText: "✅ Grand Total: ",
    priceLangBtn: "🇧🇩 বাংলা",
  },
  bn: {
    priceTitle: "💎 স্বর্ণ অলংকারের মূল্য হিসাব",
    priceKaratLabel: "ক্যারেট নির্বাচন করুন",
    priceLabel: "প্রতি ভরির স্বর্ণের দাম (টাকা)",
    voriLabel: "ভরি",
    anaLabel: "আনা",
    rotiLabel: "রতি",
    pointLabel: "পয়েন্ট",
    wagesLabel: "মজুরি প্রতি ভরি (টাকা)",
    vatLabel: "ভ্যাট (%)",
    calcBtn: "💰 হিসাব করুন",
    summaryTitle: "📊 হিসাবের ফলাফল",
    unitHeader: "ইউনিট",
    qtyHeader: "পরিমাণ",
    priceHeader: "মূল্য (৳)",
    wagesText: "💼 মোট মজুরি: ",
    vatText: "💸 ভ্যাট: ",
    totalText: "✅ সর্বমোট মূল্য: ",
    priceLangBtn: "🇬🇧 English",
  },
};

function toggleLanguage() {
  currentLang = currentLang === "en" ? "bn" : "en";
  const t = textMap[currentLang];
  document.getElementById("priceTitle").innerText = t.priceTitle;
  document.getElementById("priceKaratLabel").innerText = t.priceKaratLabel;
  document.getElementById("priceLabel").innerText = t.priceLabel;
  document.getElementById("voriLabel").innerText = t.voriLabel;
  document.getElementById("anaLabel").innerText = t.anaLabel;
  document.getElementById("rotiLabel").innerText = t.rotiLabel;
  document.getElementById("pointLabel").innerText = t.pointLabel;
  document.getElementById("wagesLabel").innerText = t.wagesLabel;
  document.getElementById("vatLabel").innerText = t.vatLabel;
  document.getElementById("calcBtn").innerText = t.calcBtn;
  document.getElementById("summaryTitle").innerText = t.summaryTitle;
  document.getElementById("unitHeader").innerText = t.unitHeader;
  document.getElementById("qtyHeader").innerText = t.qtyHeader;
  document.getElementById("priceHeader").innerText = t.priceHeader;
  document.getElementById("priceLangToggle").innerText = t.priceLangBtn;
}

// Number formatting
function formatBDT(number) {
  const [taka] = number.toFixed(2).split(".");
  const x = taka.length % 3;
  let formatted = taka.substr(0, x);
  const thousands = taka.substr(x).match(/\d{3}/g);
  if (thousands) {
    const separator = x ? "," : "";
    formatted += separator + thousands.join(",");
  }
  return "৳ " + formatted + "/-";
}

// Calculation logic
function calculatePrice() {
  const vori = parseFloat(document.getElementById("vori").value) || 0;
  const ana = parseFloat(document.getElementById("ana").value) || 0;
  const roti = parseFloat(document.getElementById("roti").value) || 0;
  const point = parseFloat(document.getElementById("point").value) || 0;
  const pricePerVori =
    parseFloat(document.getElementById("pricePerVori").value) || 0;
  const wagesPerVori =
    parseFloat(document.getElementById("wagesPerVori").value) || 0;
  const vatPercent = parseFloat(document.getElementById("vat").value) || 0;

  const totalVori = vori + ana / 16 + roti / 96 + point / 960;
  const goldPrice = totalVori * pricePerVori;
  const wages = totalVori * wagesPerVori;
  const subtotal = goldPrice + wages;
  const vat = subtotal * (vatPercent / 100);
  const total = subtotal + vat;

  const voriPrice = vori * pricePerVori;
  const anaPrice = (ana / 16) * pricePerVori;
  const rotiPrice = (roti / 96) * pricePerVori;
  const pointPrice = (point / 960) * pricePerVori;

  const priceTable = document.getElementById("priceTable");
  priceTable.innerHTML = `<tr class="bg-yellow-50 text-yellow-800 font-medium">
                                        <td class="border border-yellow-200 p-2">🪙 Vori</td>
                                        <td class="border border-yellow-200 p-2">${vori}</td>
                                        <td class="border border-yellow-200 p-2">${formatBDT(
                                          voriPrice
                                        )}</td>
                                    </tr>
                                    <tr class="bg-yellow-50 text-yellow-800 font-medium">
                                        <td class="border border-yellow-200 p-2">⚖️ Ana</td>
                                        <td class="border border-yellow-200 p-2">${ana}</td>
                                        <td class="border border-yellow-200 p-2">${formatBDT(
                                          anaPrice
                                        )}</td>
                                    </tr>
                                    <tr class="bg-yellow-50 text-yellow-800 font-medium">
                                        <td class="border border-yellow-200 p-2">🍞 Roti</td>
                                        <td class="border border-yellow-200 p-2">${roti}</td>
                                        <td class="border border-yellow-200 p-2">${formatBDT(
                                          rotiPrice
                                        )}</td>
                                    </tr>
                                    <tr class="bg-yellow-50 text-yellow-800 font-medium">
                                        <td class="border border-yellow-200 p-2">🔸 Point</td>
                                        <td class="border border-yellow-200 p-2">${point}</td>
                                        <td class="border border-yellow-200 p-2">${formatBDT(
                                          pointPrice
                                        )}</td>
                                    </tr>`;

  const t = textMap[currentLang];
  document.getElementById("wagesText").innerText = `${t.wagesText}${formatBDT(
    wages
  )}`;
  document.getElementById("vatText").innerText = `${t.vatText}${formatBDT(
    vat
  )}`;
  document.getElementById("totalText").innerText = `${t.totalText}${formatBDT(
    total
  )}`;

  document.getElementById("priceResult").classList.remove("hidden");
}

// --- Rating System ---
// --- Elements ---
const stars = document.querySelectorAll(".star");
const ratingMsg = document.getElementById("ratingMessage");
const totalVisitorsEl = document.getElementById("totalVisitors");
const totalRatingsEl = document.getElementById("totalRatings");

// --- LocalStorage keys ---
const LOCAL_KEY = "appRatingValue";
const VISITOR_KEY = "visitorCount";
const TOTAL_RATINGS_KEY = "allRatings";

let rated = false;

// --- Load saved data ---
let savedRating = parseInt(localStorage.getItem(LOCAL_KEY)) || 0;
let totalVisitors = parseInt(localStorage.getItem(VISITOR_KEY)) || 0;
let allRatings = JSON.parse(localStorage.getItem(TOTAL_RATINGS_KEY)) || [];

// --- Track visitor only once per browser ---
if (!localStorage.getItem("hasVisited")) {
  totalVisitors++;
  localStorage.setItem(VISITOR_KEY, totalVisitors);
  localStorage.setItem("hasVisited", "true");
}

// --- Show rating visually ---
function setRating(value, showMessage = true, previous = false) {
  stars.forEach((s, i) => {
    s.classList.toggle("text-yellow-500", i < value);
    s.classList.toggle("text-gray-400", i >= value);
  });

  const t = texts[currentLang];
  if (showMessage) {
    if (previous && value > 0) {
      ratingMsg.innerHTML =
        currentLang === "bn"
          ? `আপনি পূর্বে <b>${value}★</b> রেট দিয়েছেন ☀️`
          : `You previously rated <b>${value}★</b> ☀️`;
    } else {
      ratingMsg.innerHTML =
        currentLang === "bn"
          ? `ধন্যবাদ! আপনি <b>${value}★</b> রেট দিয়েছেন 💛`
          : `Thanks! You rated <b>${value}★</b> 💛`;
    }
  }

  rated = true;
}

// --- When user clicks a star ---
stars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = parseInt(star.dataset.value);
    setRating(value);
    savedRating = value;
    localStorage.setItem(LOCAL_KEY, value);

    // Save into total ratings array
    allRatings.push(value);
    localStorage.setItem(TOTAL_RATINGS_KEY, JSON.stringify(allRatings));

    updateStats();
  });
});

// --- Update total visitors & average rating ---
function updateStats() {
  const avgRating =
    allRatings.length > 0
      ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1)
      : 0;

  totalVisitorsEl.textContent =
    currentLang === "bn"
      ? `মোট দর্শক: ${totalVisitors}`
      : `Total Visitors: ${totalVisitors}`;
  totalRatingsEl.textContent =
    currentLang === "bn"
      ? `গড় রেটিং: ${avgRating}★ (${allRatings.length} ভোট)`
      : `Average Rating: ${avgRating}★ (${allRatings.length} votes)`;
}
// ELEMENTS
const karatInput = document.getElementById("karat");
const weightInput = document.getElementById("weightGram");
const calcButton = document.getElementById("calcButton");
const langToggle = document.getElementById("langToggle");
const title = document.getElementById("title");
const karatLabel = document.getElementById("karatLabel");
const weightLabel = document.getElementById("weightLabel");
const resultBox = document.getElementById("result");

// Localization texts
const texts = {
  en: {
    title: "💰 Khaad Calculator",
    karatLabel: "Karat (e.g. 22)",
    karatText: "Karat",
    weightLabel: "Total Weight (in Gram)",
    button: "Calculate",
    resultTitle: "Results each Vori",
    purity: "Purity",
    netGold: "Each Vori Khaad Weight (impurity)",
    pureGoldText: "Each Vori Pure Gold Weight",
    KhaadResult: "Khaad Per Vori",
    remaining: "Remaining Gold (After Khaad)",
    vori: "Vori",
    ana: "Ana",
    roti: "Roti",
    point: "Point",
    pureGold: "No Khaad (Pure Gold)",
    worningMessage: `
        <span class="font-medium">⚠️ Invalid Gold Karat Input!</span>
        <ul class="mt-1.5 list-disc list-inside text-sm">
          <li>Please enter a valid gold karat between <b>1 and 24</b>.</li>
          <li>Gold karat cannot be <b>zero or negative</b>.</li>
          <li>Example: Valid entries are <b>18, 22, or 24</b> karat only.</li>
        </ul>
        `,
  },
  bn: {
    title: "💰 খাদ ক্যালকুলেটর",
    karatLabel: "ক্যারেট (যেমন ২২)",
    karatText: "ক্যারেট",
    weightLabel: "মোট ওজন (গ্রামে)",
    button: "হিসাব করুন",
    resultTitle: "প্রতি ভরির ফলাফল",
    purity: "বিশুদ্ধতা",
    netGold: "খাদ ওজন (অশুদ্ধতা)",
    pureGoldText: "খাঁটি সোনার ওজন",
    KhaadResult: "প্রতি ভরির খাদ",
    remaining: "জমা/বাকি সোনা (খাদের পর)",
    vori: "ভরি",
    ana: "আনা",
    roti: "রতি",
    point: "পয়েন্ট",
    pureGold: "খাদ নেই (খাঁটি সোনা)",
    worningMessage: `
        <span class="font-medium">⚠️<b> সোনার ক্যারেটের ইনপুটটি সঠিক নয়!</b></span>
        <ul class="mt-1.5 list-disc list-inside text-sm">
          <li>অনুগ্রহ করে <b>১ থেকে ২৪</b> ক্যারেটের মধ্যে সঠিক সোনার ক্যারেট দিন।</li>
          <li>সোনার ক্যারেট <b>০ বা ঋণাত্মক</b> হতে পারবে না।</li>
          <li>উদাহরণ: কেবল <b>১৮, ২১, ২২ বা ২৪</b> ক্যারেট বৈধ ইনপুট।</li>
        </ul>
        `,
  },
};

let currentLang = "en";

// Apply language to UI labels
function applyLanguage() {
  const t = texts[currentLang];
  title.innerText = t.title;
  karatLabel.innerText = t.karatLabel;
  weightLabel.innerText = t.weightLabel;
  calcButton.innerText = t.button;
  langToggle.innerText = currentLang === "en" ? "বাংলা" : "English";

  // If result already displayed, recalc to update labels
  if (!resultBox.classList.contains("hidden")) {
    calculateKhaad();
  }
}

// Toggle language
langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "bn" : "en";
  applyLanguage();
});

// Focus karat on load
window.onload = () => {
  karatInput.focus();
  karatInput.select();
  applyLanguage();
};

// Enter key handler (karat only)
karatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    calculateKhaad();
  }
});

calcButton.addEventListener("click", calculateKhaad);

function calculateKhaad() {
  // Clear previous result
  resultBox.innerHTML = "";
  karatInput.select();
  const karat = parseFloat(karatInput.value);

  const totalGram = parseFloat(weightInput.value);
  const t = texts[currentLang];

  const GRAM_PER_VORI = 11.664;
  const ANA_PER_VORI = 16;
  const ROTI_PER_ANA = 6;
  const POINT_PER_ROTI = 10;

  if (
    isNaN(karat) ||
    isNaN(totalGram) ||
    karat <= 0 ||
    karat > 24 ||
    totalGram <= 0
  ) {
    resultBox.innerHTML = `
        <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <svg class="shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
          </svg>
          <div>
            ${t.worningMessage}
          </div>
        </div>
        `;
    resultBox.classList.remove("hidden");
    return;
  }

  // Convert available total into Vori/Ana/Roti/Point (original available)
  let totalVoriAvail = totalGram / GRAM_PER_VORI;
  let availVori = Math.trunc(totalVoriAvail);
  let availAnaTotal = (totalVoriAvail - availVori) * ANA_PER_VORI;
  let availAna = Math.trunc(availAnaTotal);
  let availRotiTotal = (availAnaTotal - availAna) * ROTI_PER_ANA;
  let availRoti = Math.trunc(availRotiTotal);
  let availPoint = Math.round((availRotiTotal - availRoti) * POINT_PER_ROTI);

  if (availPoint === 10) {
    availRoti++;
    availPoint = 0;
  }
  if (availRoti >= 6) {
    availAna += Math.floor(availRoti / 6);
    availRoti %= 6;
  }
  if (availAna >= 16) {
    availVori += Math.floor(availAna / 16);
    availAna %= 16;
  }

  // If karat == 24 (pure), khaad = 0
  const purityPercent = (karat / 24) * 100; // e.g. 22K => 91.666%
  const pureGram = (totalGram * purityPercent) / 100; // pure gold grams
  const khaadGram = totalGram - pureGram; // impurity (khaad) grams

  // Convert khaadGram into Vori/Ana/Roti/Point
  let totalVoriKhaad = khaadGram / GRAM_PER_VORI;
  let vori = Math.trunc(totalVoriKhaad);
  let anaTotal = (totalVoriKhaad - vori) * ANA_PER_VORI;
  let ana = Math.trunc(anaTotal);
  let rotiTotal = (anaTotal - ana) * ROTI_PER_ANA;
  let roti = Math.trunc(rotiTotal);
  let point = Math.round((rotiTotal - roti) * POINT_PER_ROTI);

  if (point === 10) {
    roti += 1;
    point = 0;
  }
  if (roti >= 6) {
    ana += Math.floor(roti / 6);
    roti %= 6;
  }
  if (ana >= 16) {
    vori += Math.floor(ana / 16);
    ana %= 16;
  }

  // Remaining Gold (pure gold portion) in points
  const KhaadPoints = vori * 16 * 6 * 10 + ana * 6 * 10 + roti * 10 + point;
  const availPoints =
    availVori * 16 * 6 * 10 + availAna * 6 * 10 + availRoti * 10 + availPoint;
  let remainingPoints = availPoints - KhaadPoints;
  if (remainingPoints < 0) remainingPoints = 0;

  let remVori = Math.floor(remainingPoints / (16 * 6 * 10));
  let remAna = Math.floor((remainingPoints % (16 * 6 * 10)) / (6 * 10));
  let remRoti = Math.floor((remainingPoints % (6 * 10)) / 10);
  let remPoint = remainingPoints % 10;

  // Display result (shows both khaad (impurity) and pure-gold for clarity)
  resultBox.innerHTML = `
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-sm animate-fadeIn">
          <p class="font-semibold text-yellow-700 mb-3 text-center text-lg">${
            t.resultTitle
          }</p>

          <p class="text-center text-gray-700 text-lg mb-3 bg-orange-100 border border-orange-300 text-orange-800 rounded-lg p-2">
            <span class="text-2xl font-medium">${t.karatText} :</span>
            <span class="text-2xl font-semibold">${karat.toFixed(2)}K</span>
          </p>

          

          <div class="mb-4 bg-amber-100 border border-amber-300 rounded-lg p-4 shadow-inner">
            <p class="text-center font-bold text-amber-700 mb-2">${
              t.KhaadResult
            }:</p>
            <div class="flex justify-around text-center text-amber-800">
              <div><p class="font-bold">${
                t.vori
              }</p><p class="text-3xl font-extrabold text-center">${vori}</p></div>
              <div><p class="font-bold">${
                t.ana
              }</p><p class="text-3xl font-extrabold text-center">${ana}</p></div>
              <div><p class="font-bold">${
                t.roti
              }</p><p class="text-3xl font-extrabold text-center">${roti}</p></div>
              <div><p class="font-bold">${
                t.point
              }</p><p class="text-3xl font-extrabold text-center">${point}</p></div>
            </div>
          </div>

          <div class="mb-4 bg-green-100 border border-green-300 rounded-lg p-4 shadow-inner">
            <p class="text-center font-bold text-green-700 mb-2">${
              t.remaining
            }:</p>
            <div class="flex justify-around text-center text-green-800">
              <div><p class="font-bold">${
                t.vori
              }</p><p class="text-3xl font-extrabold text-center">${remVori}</p></div>
              <div><p class="font-bold">${
                t.ana
              }</p><p class="text-3xl font-extrabold text-center">${remAna}</p></div>
              <div><p class="font-bold">${
                t.roti
              }</p><p class="text-3xl font-extrabold text-center">${remRoti}</p></div>
              <div><p class="font-bold">${
                t.point
              }</p><p class="text-3xl font-extrabold text-center">${remPoint}</p></div>
            </div>
          </div>
          <p class="text-center text-gray-700 text-lg mb-3">
            ${t.purity}: <span class="font-semibold">${purityPercent.toFixed(
    2
  )}%</span><br/>
            ${t.pureGoldText}: <span class="font-semibold">${pureGram.toFixed(
    4
  )} g</span><br/>
            ${t.netGold}: <span class="font-semibold">${khaadGram.toFixed(
    4
  )} g</span>
          </p>
        </div>
      `;

  resultBox.classList.remove("hidden");
}

// Tailwind animation config (optional)
tailwind.config = {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: { fadeIn: "fadeIn 0.5s ease-out" },
    },
  },
};
