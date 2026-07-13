const ANDROID_TEMPLATE = {
  width: 720,
  height: 1600,
  statusHeight: 74,
  headerHeight: 120,
  background: "#f2eff9",
  panel: "#fbf9ff",
  panelTop: 194,
  panelRadius: 48,
  text: "#202129",
  muted: "#4f505a",
  bubble: "#efedf7",
  input: "#efedf7",
  avatar: "#4fc16b",
  action: "#434343",
  nav: "#666666",
  accent: "#46152f",
  divider: "#59628f",
};

const ROBOTO = "Roboto, sans-serif";
const MESSAGE_LAYOUT = {
  shortMessageTop: 1003,
  minTop: 340,
  targetBottom: 1300,
  dividerOffset: 92,
  topTimeOffset: 44,
};
const AVATAR_COLORS = ["#eb9550", "#72cae2", "#ed6bb3", "#a85ced", "#74b77a"];
const BATTERY_STATE_KEY = "indonesiaSmsTestBatteryState";
const BATTERY_MIN_LEVEL = 30;
const BATTERY_MAX_LEVEL = 80;
const BATTERY_DROP_INTERVAL_MINUTES = 15;
const NOTIFICATION_ICON_ROTATION_MINUTES = 120;
const STATUS_NOTIFICATION_ICONS = ["mail", "game", "sms"];
const BATTERY_ICON_RANGES = {
  low: { min: 30, max: 40, icon: "battery30to40" },
  middle: { min: 50, max: 60, icon: "battery50to60" },
  good: { min: 75, max: 85, icon: "battery75to85" },
  high: { min: 86, max: 95, icon: "battery86to95" },
  full: { min: 96, max: 100, icon: "battery96to100" },
};
const GSM7_BASIC_CHARS =
  "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
const GSM7_EXTENDED_CHARS = "^{}\\[~]|€";
const GSM7_CHAR_SET = new Set([...GSM7_BASIC_CHARS, ...GSM7_EXTENDED_CHARS]);

function createCellSignalSvg(level) {
  const bars = [
    '<path d="M40-160v-240h120v240H40Z"/>',
    '<path d="M230-160v-320h120v320H230Z"/>',
    '<path d="M420-160v-440h120v440H420Z"/>',
    '<path d="M610-160v-520h120v520H610Z"/>',
    '<path d="M800-160v-640h120v640H800Z"/>',
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><g fill="#c7c7c7">${bars.join("")}</g><g fill="#434343">${bars
    .slice(0, level)
    .join("")}</g></svg>`;
}

function createWifiSignalSvg(level) {
  const arcs = [
    '<path d="M73-536 2-607q97-94 220.5-143.5T480-800q134 0 257.5 49.5T958-607l-71 71q-82-79-187-121.5T480-700q-115 0-220 42.5T73-536Z"/>',
    '<path d="m186-422-70-71q74-71 168-109t197-38q103 0 196.5 37.5T845-494l-70 71q-60-57-136.5-87T480-540q-83 0-158.5 30.5T186-422Z"/>',
    '<path d="m298-309-70-71q51-48 116-74t136-26q71 0 136 26t116 74l-70 71q-38-35-84.5-53T480-380q-51 0-97.5 18T298-309Z"/>',
    '<path d="M423.5-183.5Q400-207 400-240t23.5-56.5Q447-320 480-320t56.5 23.5Q560-273 560-240t-23.5 56.5Q513-160 480-160t-56.5-23.5Z"/>',
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><g fill="#c7c7c7">${arcs.join("")}</g><g fill="#434343">${arcs
    .slice(-level)
    .join("")}</g></svg>`;
}

const CARRIERS = {
  telkomsel: {
    label: "Telkomsel",
    numbers: [
      "6282318845487",
      "6282319312618",
      "6282319323199",
      "6282319312729",
      "6282319323252",
      "6282318845368",
      "6282319323210",
      "6282318800104",
      "6285218274017",
      "6282320020349",
      "6285212668525",
      "6285218825595",
      "6285218824925",
      "6285212667943",
      "6285218825395",
      "6282320022613",
      "6285218825532",
      "628132282791",
      "6282320026176",
      "628136077170",
      "6285212668229",
    ],
  },
  xl: {
    label: "XL",
    numbers: ["6283827912250", "6285929815691", "6287733039713"],
  },
  indosat: {
    label: "Indosat",
    numbers: ["6285658177770", "6285788765321", "6285715647722"],
  },
  smartfren: {
    label: "Smartfren",
    numbers: ["628884008533", "628893020599", "6288980949452"],
  },
  three: {
    label: "Three",
    numbers: ["62895411932214", "6289603547117", "6289612854455"],
  },
};

const ICONS = {
  add: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`,
  back: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>`,
  battery: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M167.69-260q-44.87 0-76.28-31.41Q60-322.82 60-367.69v-224.62q0-44.87 31.41-76.28Q122.82-700 167.69-700H700q44.87 0 76.28 31.41 31.41 31.41 31.41 76.28v224.62q0 44.87-31.41 76.28Q744.87-260 700-260H167.69Zm0-60H700q20.27 0 33.98-13.71 13.71-13.71 13.71-33.98v-224.62q0-20.27-13.71-33.98Q720.27-640 700-640H167.69q-20.27 0-33.98 13.71Q120-612.58 120-592.31v224.62q0 20.27 13.71 33.98Q147.42-320 167.69-320Zm680-67.69v-184.23h16.15q15.37 0 25.76 10.39 10.4 10.4 10.4 25.76v111.92q0 15.37-10.4 25.76-10.39 10.4-25.76 10.4h-16.15Zm-680 20v-224.62h380v224.62h-380Z"/></svg>`,
  call: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z"/></svg>`,
  cell: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M40-160v-240h120v240H40Zm190 0v-320h120v320H230Zm190 0v-440h120v440H420Zm190 0v-520h120v520H610Zm190 0v-640h120v640H800Z"/></svg>`,
  cell3: createCellSignalSvg(3),
  cell4: createCellSignalSvg(4),
  cell5: createCellSignalSvg(5),
  home: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M621.5-338.5Q680-397 680-480t-58.5-141.5Q563-680 480-680t-141.5 58.5Q280-563 280-480t58.5 141.5Q397-280 480-280t141.5-58.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>`,
  image: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Zm182.5-377.5Q400-595 400-620t-17.5-42.5Q365-680 340-680t-42.5 17.5Q280-645 280-620t17.5 42.5Q315-560 340-560t42.5-17.5Z"/></svg>`,
  navBack: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M640-200 200-480l440-280v560Z"/></svg>`,
  percent: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M300-520q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600Zm360 440q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm42.5-97.5Q720-275 720-300t-17.5-42.5Q685-360 660-360t-42.5 17.5Q600-325 600-300t17.5 42.5Q635-240 660-240t42.5-17.5ZM216-160l-56-56 584-584 56 56-584 584Z"/></svg>`,
  recents: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>`,
  smile: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm263.5 221.5Q659-337 684-400h-66q-22 37-58.5 58.5T480-320q-43 0-79.5-21.5T342-400h-66q25 63 80.5 101.5T480-260q68 0 123.5-38.5ZM324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM480-480Zm227 227q93-93 93-227t-93-227q-93-93-227-93t-227 93q-93 93-93 227t93 227q93 93 227 93t227-93Z"/></svg>`,
  user: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>`,
  voice: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#46152F"><path d="M280-240v-480h80v480h-80ZM440-80v-800h80v800h-80ZM120-400v-160h80v160h-80Zm480 160v-480h80v480h-80Zm160-160v-160h80v160h-80Z"/></svg>`,
  wifi: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="m298-309-70-71q51-48 116-74t136-26q71 0 136 26t116 74l-70 71q-38-35-84.5-53T480-380q-51 0-97.5 18T298-309ZM73-536 2-607q97-94 220.5-143.5T480-800q134 0 257.5 49.5T958-607l-71 71q-82-79-187-121.5T480-700q-115 0-220 42.5T73-536Zm113 114-70-71q74-71 168-109t197-38q103 0 196.5 37.5T845-494l-70 71q-60-57-136.5-87T480-540q-83 0-158.5 30.5T186-422Zm237.5 238.5Q400-207 400-240t23.5-56.5Q447-320 480-320t56.5 23.5Q560-273 560-240t-23.5 56.5Q513-160 480-160t-56.5-23.5Z"/></svg>`,
  wifi2: createWifiSignalSvg(2),
  wifi3: createWifiSignalSvg(3),
  wifi4: createWifiSignalSvg(4),
};

const ICON_FILE_PATHS = {
  mail: "./icons-Android/mail.svg",
  game: "./icons-Android/game.svg",
  sms: "./icons-Android/sms.svg",
  more: "./icons-Android/more.svg",
  battery30to40: "./icons-Android/battery30to40.svg",
  battery50to60: "./icons-Android/battery50to60.svg",
  battery75to85: "./icons-Android/battery75to85.svg",
  battery86to95: "./icons-Android/battery86to95.svg",
  battery96to100: "./icons-Android/battery96to100.svg",
};

const previewGrid = document.querySelector("#previewGrid");
const resultMeta = document.querySelector("#resultMeta");
const form = document.querySelector("#generatorForm");
const downloadAllButton = document.querySelector("#downloadAllButton");
const copyModifiedContentButton = document.querySelector("#copyModifiedContentButton");
const customSelects = Array.from(document.querySelectorAll("[data-custom-select]"));
const messagesInput = form.querySelector('textarea[name="messages"]');
const modifiedContentPreview = document.querySelector("#modifiedContentPreview");
const gsm7Warning = document.querySelector("#gsm7Warning");
const analysisEndpoint = "/analyze-content";
const CHECK_SMALL_ICON_PATH = "./icons-Android/check_small.svg";

const state = {
  icons: {},
  images: [],
  modifiedContents: [],
  currentPreviewIndex: 0,
};

const urlRegex =
  /\b((?:https?:\/\/)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?)(?=[\s]|$)/g;

function splitMessages(rawValue) {
  return rawValue
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function escapeFilenamePart(value) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").slice(0, 40) || "sms";
}

function pickRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getBeijingHour() {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Shanghai",
      hour: "numeric",
      hourCycle: "h23",
    }).format(new Date())
  );
}

function getBatteryIconForLevel(level) {
  if (level <= BATTERY_ICON_RANGES.low.max) return BATTERY_ICON_RANGES.low.icon;
  if (level <= BATTERY_ICON_RANGES.middle.max) return BATTERY_ICON_RANGES.middle.icon;
  if (level <= BATTERY_ICON_RANGES.good.max) return BATTERY_ICON_RANGES.good.icon;
  if (level <= BATTERY_ICON_RANGES.high.max) return BATTERY_ICON_RANGES.high.icon;
  return BATTERY_ICON_RANGES.full.icon;
}

function clampBatteryLevel(level) {
  return Math.max(BATTERY_MIN_LEVEL, Math.min(BATTERY_MAX_LEVEL, level));
}

function readBatteryState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(BATTERY_STATE_KEY) || "null");
    if (!savedState || typeof savedState.level !== "number" || typeof savedState.updatedAt !== "number") {
      return null;
    }
    return savedState;
  } catch {
    return null;
  }
}

function writeBatteryState(level, updatedAt) {
  try {
    localStorage.setItem(BATTERY_STATE_KEY, JSON.stringify({ level, updatedAt }));
  } catch {
    // localStorage may be unavailable in private or restricted browsing.
  }
}

function createInitialBatteryLevel() {
  return 74 + Math.floor(Math.random() * 7);
}

function createBaseBatteryLevel() {
  const now = Date.now();
  const savedState = readBatteryState();

  if (!savedState) {
    const initialLevel = createInitialBatteryLevel();
    writeBatteryState(initialLevel, now);
    return initialLevel;
  }

  const previousLevel = clampBatteryLevel(savedState.level);
  const elapsedMinutes = Math.max(0, Math.floor((now - savedState.updatedAt) / 60000));
  const dropAmount = Math.floor(elapsedMinutes / BATTERY_DROP_INTERVAL_MINUTES);
  const nextLevel = clampBatteryLevel(previousLevel - dropAmount);

  writeBatteryState(nextLevel, now);
  return nextLevel;
}

function createBatteryProfile(level) {
  const displayLevel = clampBatteryLevel(level);

  return {
    batteryIcon: getBatteryIconForLevel(displayLevel),
    batteryLevel: String(displayLevel),
  };
}

function createBatteryProfiles(timePairs) {
  const baseLevel = createBaseBatteryLevel();
  const timestamps = timePairs.map((timePair) => timePair.statusTimestamp);
  const earliestTimestamp = Math.min(...timestamps);
  const latestTimestamp = Math.max(...timestamps);
  const shouldVaryWithinBatch = latestTimestamp > earliestTimestamp && baseLevel > BATTERY_MIN_LEVEL;
  const profiles = timePairs.map((timePair) => {
    const level = shouldVaryWithinBatch && timePair.statusTimestamp > earliestTimestamp ? baseLevel - 1 : baseLevel;
    return createBatteryProfile(level);
  });

  writeBatteryState(baseLevel, Date.now());
  return profiles;
}

function createStatusNotificationProfile() {
  const slot = Math.floor(Date.now() / (NOTIFICATION_ICON_ROTATION_MINUTES * 60 * 1000));

  return {
    notificationIcon: STATUS_NOTIFICATION_ICONS[slot % STATUS_NOTIFICATION_ICONS.length],
  };
}

function createStatusSignalProfiles(count) {
  const baseProfiles = [
    { cellIcon: "cell4", wifiIcon: "wifi3" },
    { cellIcon: "cell4", wifiIcon: "wifi4" },
    { cellIcon: "cell5", wifiIcon: "wifi4" },
  ];
  const variantProfiles = [
    { cellIcon: "cell3", wifiIcon: "wifi3" },
    { cellIcon: "cell4", wifiIcon: "wifi2" },
    { cellIcon: "cell5", wifiIcon: "wifi3" },
  ];
  const baseProfile = pickRandomItem(baseProfiles);
  const profiles = Array.from({ length: count }, () => ({ ...baseProfile }));
  const variationCount = count >= 8 ? 2 : count >= 4 ? 1 : 0;
  const usedIndexes = new Set();

  while (usedIndexes.size < variationCount) {
    const index = Math.floor(Math.random() * count);
    usedIndexes.add(index);
  }

  usedIndexes.forEach((index) => {
    profiles[index] = { ...pickRandomItem(variantProfiles) };
  });

  return profiles;
}

function findNonGsm7Characters(value) {
  return [...new Set([...value].filter((character) => !GSM7_CHAR_SET.has(character)))];
}

function updateGsm7Warning() {
  const invalidCharacters = findNonGsm7Characters(messagesInput.value);

  if (!invalidCharacters.length) {
    gsm7Warning.hidden = true;
    gsm7Warning.textContent = "检测到非 GSM7 字符";
    return;
  }

  gsm7Warning.hidden = false;
  gsm7Warning.textContent = `检测到非 GSM7 字符：${invalidCharacters.join(" ")}`;
}

function formatIndonesianNumber(rawNumber) {
  const digits = rawNumber.replace(/\D/g, "");
  const localNumber = digits.startsWith("62") ? `0${digits.slice(2)}` : digits;
  const groups = [localNumber.slice(0, 4), localNumber.slice(4, 8), localNumber.slice(8)].filter(Boolean);
  return groups.join("-");
}

function getCarrierProfile(carrier) {
  return CARRIERS[carrier] || CARRIERS.telkomsel;
}

function createCarrierContact(carrier) {
  const profile = getCarrierProfile(carrier);
  return {
    contact: formatIndonesianNumber(pickRandomItem(profile.numbers)),
    carrierLabel: profile.label.toUpperCase(),
  };
}

function getBeijingTimePair() {
  const offsetMinutes = Math.floor(Math.random() * 3);
  const date = new Date(Date.now() - offsetMinutes * 60 * 1000);
  const unreadDate = new Date(date.getTime() - Math.floor(Math.random() * 2) * 60 * 1000);

  return {
    statusTime: formatBeijingTime(date),
    unreadTime: formatBeijingTime(unreadDate),
    statusTimestamp: date.getTime(),
  };
}

function formatBeijingTime(date) {
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

function svgToDataUrl(svg) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Icon failed to load: ${src}`));
    image.src = src;
  });
}

async function loadIcons() {
  const pairs = await Promise.all(
    Object.entries(ICONS).map(async ([name, svg]) => [name, await loadImage(svgToDataUrl(svg))])
  );
  const filePairs = await Promise.all(
    Object.entries(ICON_FILE_PATHS).map(async ([name, path]) => [name, await loadImage(path)])
  );

  pairs.push(...filePairs);
  state.icons = Object.fromEntries(pairs);
}

function tokenizeText(text) {
  const tokens = [];
  let lastIndex = 0;

  text.replace(urlRegex, (match, _group, offset) => {
    if (offset > lastIndex) {
      tokens.push({ text: text.slice(lastIndex, offset), type: "text" });
    }
    tokens.push({ text: match, type: "link" });
    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    tokens.push({ text: text.slice(lastIndex), type: "text" });
  }

  return tokens.length ? tokens : [{ text, type: "text" }];
}

function measureTokenChunks(ctx, token) {
  const pieces = token.text.split(/(\s+)/).filter(Boolean);
  return pieces.map((piece) => ({
    text: piece,
    type: token.type,
    width: ctx.measureText(piece).width,
  }));
}

function breakChunkToFit(ctx, chunk, availableWidth, maxWidth) {
  if (chunk.width <= availableWidth || chunk.width <= maxWidth) {
    return [chunk];
  }

  const parts = [];
  let remaining = chunk.text;
  let currentLimit = availableWidth;

  while (remaining.length) {
    let slice = "";

    for (const character of remaining) {
      const nextSlice = slice + character;
      if (ctx.measureText(nextSlice).width > currentLimit && slice) {
        break;
      }
      slice = nextSlice;
    }

    if (!slice) {
      slice = remaining[0];
    }

    parts.push({
      text: slice,
      type: chunk.type,
      width: ctx.measureText(slice).width,
    });

    remaining = remaining.slice(slice.length);
    currentLimit = maxWidth;
  }

  return parts;
}

function layoutRichText(ctx, text, maxWidth, lineHeight) {
  const chunks = tokenizeText(text).flatMap((token) => measureTokenChunks(ctx, token));
  const lines = [];
  let currentLine = [];
  let currentWidth = 0;

  chunks.forEach((chunk) => {
    const availableWidth = maxWidth - currentWidth;
    const chunkParts = breakChunkToFit(ctx, chunk, availableWidth, maxWidth);

    chunkParts.forEach((part, index) => {
      const forceWrap = currentWidth > 0 && currentWidth + part.width > maxWidth;

      if (forceWrap) {
        lines.push(currentLine);
        currentLine = [];
        currentWidth = 0;
      }

      const isLeadingWhitespace = /^\s+$/.test(part.text) && currentWidth === 0;
      if (!isLeadingWhitespace) {
        currentLine.push(part);
        currentWidth += part.width;
      }

      if (index < chunkParts.length - 1) {
        lines.push(currentLine);
        currentLine = [];
        currentWidth = 0;
      }
    });
  });

  if (currentLine.length) {
    lines.push(currentLine);
  }

  return lines;
}

function roundRect(ctx, x, y, width, height, radius, fillStyle) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function drawIcon(ctx, name, x, y, size) {
  const icon = state.icons[name];
  if (!icon) return;
  ctx.drawImage(icon, x, y, size, size);
}

function drawIconCentered(ctx, name, centerX, centerY, size, offsetY = 0) {
  drawIcon(ctx, name, centerX - size / 2, centerY - size / 2 + offsetY, size);
}

function drawText(ctx, text, x, y, options = {}) {
  ctx.save();
  ctx.font = options.font || `400 24px ${ROBOTO}`;
  ctx.fillStyle = options.color || ANDROID_TEMPLATE.text;
  ctx.textAlign = options.align || "left";
  ctx.textBaseline = options.baseline || "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawStatusBar(ctx, data) {
  const centerY = 39;

  drawText(ctx, data.statusTime, 44, 39, {
    font: `500 24px ${ROBOTO}`,
    color: ANDROID_TEMPLATE.text,
  });

  drawIconCentered(ctx, data.notificationIcon || "mail", 125, centerY, 24);
  drawIconCentered(ctx, "more", 156, centerY, 24);
  drawIconCentered(ctx, data.cellIcon || "cell", 524, centerY, 28);
  drawIconCentered(ctx, data.wifiIcon || "wifi", 563, centerY, 30);
  drawIconCentered(ctx, data.batteryIcon || "battery", 609, centerY, 41);
  drawText(ctx, data.batteryLevel, 668, 39, {
    font: `500 24px ${ROBOTO}`,
    color: ANDROID_TEMPLATE.text,
    align: "right",
  });
  drawIconCentered(ctx, "percent", 678, centerY, 12, 4);
}

function drawHeader(ctx, data) {
  drawIcon(ctx, "back", 34, 113, 36);

  ctx.beginPath();
  ctx.arc(160, 132, 40, 0, Math.PI * 2);
  ctx.fillStyle = data.avatarColor || ANDROID_TEMPLATE.avatar;
  ctx.fill();
  drawIcon(ctx, "user", 130, 102, 60);

  drawText(ctx, data.contact, 224, 134, {
    font: `400 33px ${ROBOTO}`,
    color: ANDROID_TEMPLATE.text,
  });

  drawIcon(ctx, "call", 546, 112, 42);
  drawIcon(ctx, "more", 644, 113, 40);
}

function drawConversationPanel(ctx) {
  ctx.fillStyle = ANDROID_TEMPLATE.background;
  ctx.fillRect(0, 0, ANDROID_TEMPLATE.width, ANDROID_TEMPLATE.height);

  ctx.beginPath();
  const y = ANDROID_TEMPLATE.panelTop;
  const radius = ANDROID_TEMPLATE.panelRadius;
  ctx.moveTo(0, y + radius);
  ctx.quadraticCurveTo(0, y, radius, y);
  ctx.lineTo(ANDROID_TEMPLATE.width - radius, y);
  ctx.quadraticCurveTo(ANDROID_TEMPLATE.width, y, ANDROID_TEMPLATE.width, y + radius);
  ctx.lineTo(ANDROID_TEMPLATE.width, ANDROID_TEMPLATE.height);
  ctx.lineTo(0, ANDROID_TEMPLATE.height);
  ctx.closePath();
  ctx.fillStyle = ANDROID_TEMPLATE.panel;
  ctx.fill();
}

function drawDividerLabel(ctx, y) {
  ctx.strokeStyle = ANDROID_TEMPLATE.divider;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(16, y);
  ctx.lineTo(333, y);
  ctx.moveTo(386, y);
  ctx.lineTo(704, y);
  ctx.stroke();

  drawText(ctx, "未读", 360, y - 1, {
    font: `400 23px ${ROBOTO}`,
    color: ANDROID_TEMPLATE.divider,
    align: "center",
  });
}

function measureMessageBubble(ctx, message) {
  const width = 628;
  const paddingX = 32;
  const paddingTop = 24;
  const paddingBottom = 18;
  const maxHeight = MESSAGE_LAYOUT.targetBottom - MESSAGE_LAYOUT.minTop;
  const variants = [
    { fontSize: 30, lineHeight: 42 },
    { fontSize: 28, lineHeight: 38 },
    { fontSize: 26, lineHeight: 35 },
  ];
  let selected = variants[0];
  let lines = [];

  for (const variant of variants) {
    ctx.font = `400 ${variant.fontSize}px ${ROBOTO}`;
    const measuredLines = layoutRichText(ctx, message, width - paddingX * 2, variant.lineHeight);
    const measuredHeight = Math.max(88, measuredLines.length * variant.lineHeight + paddingTop + paddingBottom);
    selected = variant;
    lines = measuredLines;

    if (measuredHeight <= maxHeight) {
      break;
    }
  }

  const maxLines = Math.max(1, Math.floor((maxHeight - paddingTop - paddingBottom) / selected.lineHeight));
  const isTruncated = lines.length > maxLines;
  if (isTruncated) {
    lines = lines.slice(0, maxLines);
    const lastLine = lines[lines.length - 1] || [];
    const ellipsis = { text: "...", type: "text", width: ctx.measureText("...").width };

    while (lastLine.length && lastLine.reduce((sum, chunk) => sum + chunk.width, ellipsis.width) > width - paddingX * 2) {
      lastLine.pop();
    }

    lastLine.push(ellipsis);
  }

  const height = Math.max(88, lines.length * selected.lineHeight + paddingTop + paddingBottom);

  return {
    x: 16,
    width,
    paddingX,
    paddingTop,
    lineHeight: selected.lineHeight,
    fontSize: selected.fontSize,
    lines,
    height,
  };
}

function drawMessageBubble(ctx, layout, y) {
  ctx.font = `400 ${layout.fontSize || 30}px ${ROBOTO}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  roundRect(ctx, layout.x, y, layout.width, layout.height, 36, ANDROID_TEMPLATE.bubble);

  let textY = y + layout.paddingTop + layout.lineHeight / 2;
  layout.lines.forEach((line) => {
    let textX = layout.x + layout.paddingX;
    line.forEach((chunk) => {
      ctx.fillStyle = ANDROID_TEMPLATE.text;
      ctx.fillText(chunk.text, textX, textY);

      if (chunk.type === "link") {
        const underlineY = textY + 17;
        ctx.strokeStyle = ANDROID_TEMPLATE.text;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(textX, underlineY);
        ctx.lineTo(textX + chunk.width, underlineY);
        ctx.stroke();
      }

      textX += chunk.width;
    });
    textY += layout.lineHeight;
  });

  return y + layout.height;
}

function drawComposer(ctx, data) {
  drawText(ctx, `正在使用 ${data.carrierLabel} 发送`, 360, 1367, {
    font: `400 22px ${ROBOTO}`,
    color: ANDROID_TEMPLATE.muted,
    align: "center",
  });

  roundRect(ctx, 16, 1421, 552, 109, 54, ANDROID_TEMPLATE.input);
  drawIcon(ctx, "add", 40, 1453, 44);
  drawText(ctx, `${data.carrierLabel} • 短信`, 114, 1475, {
    font: `400 30px ${ROBOTO}`,
    color: "#4d4e58",
  });
  drawIcon(ctx, "smile", 407, 1450, 50);
  drawIcon(ctx, "image", 504, 1452, 46);

  ctx.beginPath();
  ctx.arc(648, 1475, 57, 0, Math.PI * 2);
  ctx.fillStyle = "#f9daea";
  ctx.fill();
  drawIcon(ctx, "voice", 624, 1451, 48);
}

function drawBottomNavigation(ctx) {
  drawIcon(ctx, "recents", 181, 1560, 32);
  drawIcon(ctx, "home", 342, 1557, 38);
  drawIcon(ctx, "navBack", 510, 1559, 34);
}

function renderAndroidCanvas(data) {
  const canvas = document.createElement("canvas");
  canvas.width = ANDROID_TEMPLATE.width;
  canvas.height = ANDROID_TEMPLATE.height;
  const ctx = canvas.getContext("2d");

  drawConversationPanel(ctx);
  drawStatusBar(ctx, data);
  drawHeader(ctx, data);

  const messageLayout = measureMessageBubble(ctx, data.message);
  const naturalBubbleY = MESSAGE_LAYOUT.targetBottom - messageLayout.height;
  const bubbleY = Math.min(MESSAGE_LAYOUT.shortMessageTop, Math.max(MESSAGE_LAYOUT.minTop, naturalBubbleY));
  const dividerY = bubbleY - MESSAGE_LAYOUT.dividerOffset;
  const topTimeY = bubbleY - MESSAGE_LAYOUT.topTimeOffset;

  drawDividerLabel(ctx, dividerY);
  drawText(ctx, data.unreadTime, 360, topTimeY, {
    font: `400 21px ${ROBOTO}`,
    color: ANDROID_TEMPLATE.muted,
    align: "center",
  });

  drawMessageBubble(ctx, messageLayout, bubbleY);
  drawComposer(ctx, data);
  drawBottomNavigation(ctx);

  return canvas;
}

function buildCard(imageData, index, message) {
  const article = document.createElement("article");
  article.className = "preview-card";
  article.dataset.previewIndex = String(index);

  const imageWrap = document.createElement("div");
  imageWrap.className = "preview-image-wrap";

  const image = document.createElement("img");
  image.className = "preview-image";
  image.src = imageData.url;
  image.alt = `安卓短信截图 ${index + 1}`;
  imageWrap.appendChild(image);

  const meta = document.createElement("div");
  meta.className = "preview-meta";

  const label = document.createElement("p");
  label.textContent = `第 ${index + 1} 张 · ${message}`;

  meta.append(label);
  article.append(imageWrap, meta);
  return article;
}

function updatePreviewCarousel() {
  const cards = Array.from(previewGrid.querySelectorAll(".preview-card"));
  const hasImages = state.images.length > 0;

  cards.forEach((card, index) => {
    card.classList.toggle("is-active", index === state.currentPreviewIndex);
  });

  const currentLabel = previewGrid.querySelector("[data-current-preview]");
  if (currentLabel && hasImages) {
    currentLabel.textContent = `${state.currentPreviewIndex + 1} / ${state.images.length}`;
  }

  const previousButton = previewGrid.querySelector("[data-preview-previous]");
  const nextButton = previewGrid.querySelector("[data-preview-next]");
  if (previousButton && nextButton) {
    const shouldDisable = state.images.length <= 1;
    previousButton.disabled = shouldDisable;
    nextButton.disabled = shouldDisable;
  }
}

function showPreviousPreview() {
  if (state.images.length <= 1) return;
  state.currentPreviewIndex = (state.currentPreviewIndex - 1 + state.images.length) % state.images.length;
  updatePreviewCarousel();
}

function showNextPreview() {
  if (state.images.length <= 1) return;
  state.currentPreviewIndex = (state.currentPreviewIndex + 1) % state.images.length;
  updatePreviewCarousel();
}

function bindPreviewSwipe(card) {
  let startX = 0;
  let startY = 0;

  card.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    },
    { passive: true }
  );

  card.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) return;

      if (deltaX < 0) {
        showNextPreview();
      } else {
        showPreviousPreview();
      }
    },
    { passive: true }
  );
}

function renderPreviewImages(images) {
  previewGrid.innerHTML = "";
  previewGrid.classList.remove("is-empty");
  previewGrid.classList.toggle("is-carousel", images.length > 0);
  state.currentPreviewIndex = 0;

  images.forEach((imageData, index) => {
    const card = buildCard(imageData, index, imageData.message);
    bindPreviewSwipe(card);
    previewGrid.appendChild(card);
  });

  if (images.length > 0) {
    const controls = document.createElement("div");
    controls.className = "carousel-controls";

    const previousButton = document.createElement("button");
    previousButton.type = "button";
    previousButton.textContent = "上一张";
    previousButton.dataset.previewPrevious = "true";

    const currentLabel = document.createElement("span");
    currentLabel.dataset.currentPreview = "true";

    const nextButton = document.createElement("button");
    nextButton.type = "button";
    nextButton.textContent = "下一张";
    nextButton.dataset.previewNext = "true";

    previousButton.addEventListener("click", () => {
      showPreviousPreview();
    });

    nextButton.addEventListener("click", () => {
      showNextPreview();
    });

    controls.append(previousButton, currentLabel, nextButton);
    previewGrid.appendChild(controls);
  }

  updatePreviewCarousel();
}

function isLocalServerMode() {
  return location.protocol === "http:" || location.protocol === "https:";
}

function isMobileViewport() {
  return window.matchMedia("(max-width: 980px)").matches;
}

async function dataUrlToFile(dataUrl, filename) {
  const blob = await fetch(dataUrl).then((response) => response.blob());
  return new File([blob], filename, { type: blob.type || "image/png" });
}

async function shareImagesToMobileAlbum(images) {
  if (!navigator.canShare || !navigator.share) {
    return false;
  }

  const files = await Promise.all(images.map((image) => dataUrlToFile(image.url, image.filename)));

  if (!navigator.canShare({ files })) {
    return false;
  }

  await navigator.share({
    files,
    title: "短信截图",
    text: "保存生成的短信截图",
  });

  return true;
}

function initCustomSelects() {
  customSelects.forEach((customSelect) => {
    const trigger = customSelect.querySelector(".carrier-trigger");
    const selectedLabel = customSelect.querySelector("[data-selected-label]");
    const options = Array.from(customSelect.querySelectorAll(".carrier-option"));
    const input = customSelect.parentElement.querySelector('input[type="hidden"]');

    if (!trigger || !selectedLabel || !input) return;

    trigger.addEventListener("click", () => {
      const isOpen = customSelect.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        input.value = option.dataset.value;
        selectedLabel.textContent = option.textContent;

        options.forEach((item) => {
          const isSelected = item === option;
          item.classList.toggle("is-selected", isSelected);
          item.setAttribute("aria-selected", String(isSelected));
        });

        customSelect.classList.remove("is-open");
        trigger.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.addEventListener("click", (event) => {
    customSelects.forEach((customSelect) => {
      if (customSelect.contains(event.target)) return;
      const trigger = customSelect.querySelector(".carrier-trigger");
      customSelect.classList.remove("is-open");
      trigger?.setAttribute("aria-expanded", "false");
    });
  });
}

async function saveImagesToOutputs(images, triggerButton = downloadAllButton) {
  if (!images.length) {
    renderEmptyState();
    return;
  }

  const originalText = triggerButton.textContent;
  triggerButton.disabled = true;
  triggerButton.textContent = "下载中...";

  try {
    if (isMobileViewport() && (await shareImagesToMobileAlbum(images))) {
      resultMeta.textContent = `已打开 ${images.length} 张 PNG 的保存面板`;
    } else if ("showDirectoryPicker" in window) {
      const directoryHandle = await window.showDirectoryPicker();

      for (const image of images) {
        const fileHandle = await directoryHandle.getFileHandle(image.filename, { create: true });
        const writable = await fileHandle.createWritable();
        const imageBlob = await fetch(image.url).then((response) => response.blob());
        await writable.write(imageBlob);
        await writable.close();
      }

      resultMeta.textContent = `已保存 ${images.length} 张 PNG`;
    } else {
      images.forEach((image, index) => {
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = image.url;
          link.download = image.filename;
          document.body.appendChild(link);
          link.click();
          link.remove();
        }, index * 120);
      });
      resultMeta.textContent = `已触发 ${images.length} 张 PNG 下载`;
    }
  } catch (error) {
    if (error.name === "AbortError") return;
    console.error(error);
    alert("下载失败，请稍后重试。");
  } finally {
    setTimeout(() => {
      triggerButton.disabled = false;
      triggerButton.textContent = originalText;
    }, images.length * 120 + 300);
  }
}

function renderEmptyState(text = "输入短信内容后点击“生成截图”，这里会出现对应的预览图片。") {
  previewGrid.innerHTML = "";
  previewGrid.classList.add("is-empty");
  previewGrid.classList.remove("is-carousel");
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.textContent = text;
  previewGrid.appendChild(empty);
}

function updateModifiedContentPreview(contents = state.modifiedContents) {
  state.modifiedContents = contents;
  modifiedContentPreview.value = contents.join("\n\n");
  copyModifiedContentButton.disabled = !contents.length;
}

function readFormData() {
  const rawData = new FormData(form);
  return {
    carrier: String(rawData.get("carrier") || "telkomsel"),
    messageType: String(rawData.get("messageType") || "BC"),
    messages: String(rawData.get("messages") || ""),
  };
}

async function analyzeMessageContent(message, messageType) {
  const response = await fetch(analysisEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message, messageType }),
  });

  if (!response.ok) {
    throw new Error(`内容分析失败：${response.status}`);
  }

  const result = await response.json();
  const modifiedContent = result?.data?.modified_content;

  if (!result.success || typeof modifiedContent !== "string" || !modifiedContent.trim()) {
    throw new Error(result.message || "内容分析未返回 modified_content");
  }

  return modifiedContent;
}

async function generateImages(formData) {
  const messages = splitMessages(formData.messages);

  if (!messages.length) {
    state.images = [];
    updateModifiedContentPreview([]);
    resultMeta.textContent = "共 0 张";
    renderEmptyState();
    return;
  }

  resultMeta.textContent = `正在分析 ${messages.length} 条短信...`;
  renderEmptyState("正在调用内容分析接口...");

  const analyzedMessages = await Promise.all(
    messages.map((message) => analyzeMessageContent(message, formData.messageType))
  );
  updateModifiedContentPreview(analyzedMessages);

  const timePairs = analyzedMessages.map(() => getBeijingTimePair());
  const batteryProfiles = createBatteryProfiles(timePairs);
  const statusSignalProfiles = createStatusSignalProfiles(analyzedMessages.length);
  const statusNotificationProfile = createStatusNotificationProfile();
  const images = analyzedMessages.map((message, index) => {
    const { statusTime, unreadTime } = timePairs[index];
    const carrierContact = createCarrierContact(formData.carrier);
    const avatarColor = pickRandomItem(AVATAR_COLORS);
    const batteryProfile = batteryProfiles[index];
    const statusSignalProfile = statusSignalProfiles[index];
    const canvas = renderAndroidCanvas({
      ...formData,
      ...carrierContact,
      ...statusSignalProfile,
      ...batteryProfile,
      ...statusNotificationProfile,
      avatarColor,
      statusTime,
      unreadTime,
      message,
    });
    return {
      url: canvas.toDataURL("image/png"),
      filename: `android-${String(index + 1).padStart(2, "0")}-${escapeFilenamePart(carrierContact.contact)}.png`,
      message,
    };
  });

  state.images = images;
  resultMeta.textContent = `共 ${images.length} 张`;
  renderPreviewImages(images);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateGsm7Warning();
  const submitButton = event.submitter || form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "分析中...";

  generateImages(readFormData())
    .catch((error) => {
      console.error(error);
      state.images = [];
      updateModifiedContentPreview([]);
      resultMeta.textContent = "内容分析失败";
      renderEmptyState("内容分析接口调用失败，请确认本地服务已启动并且接口可访问。");
      alert(error.message || "内容分析失败");
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    });
});

downloadAllButton.addEventListener("click", () => {
  saveImagesToOutputs(state.images);
});

copyModifiedContentButton.addEventListener("click", async () => {
  if (!state.modifiedContents.length) return;

  const originalContent = copyModifiedContentButton.innerHTML;
  const text = state.modifiedContents.join("\n\n");
  const showCopiedState = () => {
    copyModifiedContentButton.innerHTML = `<img src="${CHECK_SMALL_ICON_PATH}" alt="" />已复制`;
  };

  try {
    await navigator.clipboard.writeText(text);
    showCopiedState();
  } catch (_error) {
    modifiedContentPreview.select();
    document.execCommand("copy");
    showCopiedState();
  } finally {
    setTimeout(() => {
      copyModifiedContentButton.innerHTML = originalContent;
    }, 1200);
  }
});

initCustomSelects();
messagesInput.addEventListener("input", updateGsm7Warning);
updateGsm7Warning();
updateModifiedContentPreview([]);
renderEmptyState("正在加载安卓图标...");
loadIcons()
  .then(() => renderEmptyState())
  .catch((error) => {
    console.error(error);
    resultMeta.textContent = "图标加载失败";
    renderEmptyState("安卓图标加载失败，请确认 icons-Android 文件夹与 index.html 在同一目录。");
  });
