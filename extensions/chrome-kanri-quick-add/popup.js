// SPDX-FileCopyrightText: Copyright (c) 2022-2026 trobonox <hello@trobo.dev>
//
// SPDX-License-Identifier: GPL-3.0-or-later
/* global chrome */

const QUICK_ADD_BRIDGE_URL = "http://127.0.0.1:47827/quick-add";
const QUICK_ADD_BOARDS_URL = "http://127.0.0.1:47827/boards";

const titleElement = document.querySelector("#tab-title");
const urlElement = document.querySelector("#tab-url");
const boardSelect = document.querySelector("#board-select");
const targetColumnElement = document.querySelector("#target-column");
const addButton = document.querySelector("#add-task");
const statusElement = document.querySelector("#status");

let currentTab = null;
let boards = [];
let bridgeAvailable = false;

const isSupportedUrl = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

const setStatus = (message) => {
  statusElement.textContent = message;
};

const selectedBoard = () =>
  boards.find((board) => board.id === boardSelect.value) ?? null;

const updateActionState = () => {
  const supported = isSupportedUrl(currentTab?.url || "");
  const board = selectedBoard();

  addButton.disabled = !supported || !bridgeAvailable || !board;
  targetColumnElement.textContent = board
    ? `${board.targetColumn || "Idea"} kolonuna kaydedilecek.`
    : "";

  if (!supported) {
    setStatus("Yalnızca http/https sayfaları task olarak eklenebilir.");
    return;
  }

  if (!bridgeAvailable) {
    setStatus("Kanri uygulamasını açıp tekrar deneyin.");
    return;
  }

  if (boards.length === 0) {
    setStatus("Kanri'de kayıtlı tablo bulunamadı.");
    return;
  }

  setStatus("Tabloyu seçip task'i kaydedebilirsin.");
};

const renderTab = (tab) => {
  currentTab = tab;

  const title = tab?.title?.trim() || "Başlıksız sayfa";
  const url = tab?.url || "";

  titleElement.textContent = title;
  urlElement.textContent = url;
  updateActionState();
};

const renderBoards = () => {
  boardSelect.textContent = "";
  boardSelect.disabled = !bridgeAvailable || boards.length === 0;

  if (!bridgeAvailable) {
    const option = document.createElement("option");
    option.textContent = "Kanri bağlantısı yok";
    boardSelect.append(option);
    updateActionState();
    return;
  }

  if (boards.length === 0) {
    const option = document.createElement("option");
    option.textContent = "Tablo bulunamadı";
    boardSelect.append(option);
    updateActionState();
    return;
  }

  for (const board of boards) {
    const option = document.createElement("option");
    option.value = board.id;
    option.textContent = board.title || "Başlıksız tablo";
    boardSelect.append(option);
  }

  updateActionState();
};

const fetchBoards = async () => {
  try {
    const response = await fetch(QUICK_ADD_BOARDS_URL);
    if (!response.ok) {
      throw new Error(`Kanri bridge rejected the request: ${response.status}`);
    }

    const data = await response.json();
    boards = Array.isArray(data.boards) ? data.boards : [];
    bridgeAvailable = true;
  } catch {
    boards = [];
    bridgeAvailable = false;
  }

  renderBoards();
};

const sendToBridge = async (tab, boardId) => {
  const response = await fetch(QUICK_ADD_BRIDGE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      boardId,
      title: tab.title || "",
      url: tab.url || "",
    }),
  });

  if (!response.ok) {
    throw new Error(`Kanri bridge rejected the request: ${response.status}`);
  }
};

const openInKanri = async () => {
  if (!currentTab || !isSupportedUrl(currentTab.url)) return;
  const board = selectedBoard();
  if (!board) return;

  setStatus("Kanri'ye gönderiliyor...");
  addButton.disabled = true;

  try {
    await sendToBridge(currentTab, board.id);
    setStatus("Kanri'ye gönderildi.");
    window.close();
    return;
  } catch {
    setStatus("Kaydedilemedi. Kanri açık mı kontrol edip tekrar dene.");
    addButton.disabled = false;
  }
};


chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  renderTab(tab);
});

void fetchBoards();
boardSelect.addEventListener("change", updateActionState);
addButton.addEventListener("click", openInKanri);
