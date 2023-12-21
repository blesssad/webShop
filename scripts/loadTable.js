document.addEventListener("DOMContentLoaded", function () {
    const storedDays = localStorage.getItem("days-count");
    const storedCount = localStorage.getItem("max-lessons-count");
    const storedData = localStorage.getItem("table-data");

    const values = JSON.parse(storedData);
    const textarea = document.getElementsByTagName("textarea");

    if (storedDays && storedCount) {
        const loadingArea = document.querySelector(".loading-area");
        loadingArea.style.display = "block";

        const loadArea = createLoadArea();

        loadingArea.appendChild(loadArea);

        const loadButton = loadArea.querySelector(".load-button");
        const cancelButton = loadArea.querySelector(".cancel-button");

        loadButton.addEventListener("click", function (e) {
            e.preventDefault();

            printUserTable(storedDays, storedCount);

            for (let i = 0; i < textarea.length; i++){
                textarea[i].value = values[i]
            }

            loadingArea.removeChild(loadArea);
            loadingArea.style.display = "none";
        });

        cancelButton.addEventListener("click", function (e) {
            e.preventDefault();
            loadingArea.removeChild(loadArea);
            loadingArea.style.display = "none";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault();

        const days = getSelectedDays();
        const count = getMaxLessonsCount();

        if (count) {
            printUserTable(days, count);

            const savingArea = document.querySelector(".saving-area");
            savingArea.style.display = "block";

            removeAllSaveAreas(savingArea);

            const saveArea = createSaveArea();

            savingArea.appendChild(saveArea);

            const saveButton = saveArea.querySelector(".save-button");
            const notSaveButton = saveArea.querySelector(".not-save-button");

            saveButton.addEventListener("click", function (e) {
                e.preventDefault();
                saveToLocalStorage(days, count);

                alert("Параметры сохранены!");

                savingArea.removeChild(saveArea);
                savingArea.style.display = "none";
            });

            notSaveButton.addEventListener("click", function (e) {
                e.preventDefault();
                savingArea.removeChild(saveArea);
                savingArea.style.display = "none";
            });
        } else {
            alert("Пожалуйста, введите количество дней");
        }
    });
});

function getSelectedDays() {
    const daysInput = document.getElementsByName("days_count");
    let days;

    daysInput.forEach((input) => {
        if (input.checked) {
            days = input.value;
        }
    });

    return days;
}

function getMaxLessonsCount() {
    const maxLessonsCount = document.getElementById("max-lessons-count");
    return maxLessonsCount.value;
}

function createLoadArea() {
    const loadArea = createDivElement("load-area", "В памяти сохранены предыдущие параметры. Загрузить их?");
    const loadButton = createButtonElement("load-button", "Загрузить");
    const cancelButton = createButtonElement("cancel-button", "Не загружать");

    appendElements(loadArea, [loadButton, cancelButton]);

    return loadArea;
}

function createSaveArea() {
    const saveArea = createDivElement("save-area", "Сохранить введённые параметры?");

    const saveButton = createButtonElement("save-button", "Сохранить");
    const notSaveButton = createButtonElement("not-save-button", "Не сохранять");

    appendElements(saveArea, [saveButton, notSaveButton]);

    return saveArea;
}

function removeAllSaveAreas(savingArea) {
    const saveAreas = document.querySelectorAll(".save-area");
    saveAreas.forEach((area) => {
        savingArea.removeChild(area);
    });
}

function saveToLocalStorage(days, count) {
    localStorage.setItem("days-count", days);
    localStorage.setItem("max-lessons-count", count);
    saveData(count);
}

function saveData(count) {
    // Получаем таблицу
    const textarea = document.getElementsByTagName("textarea");
    const data = [];

    for (let i = 0; i < textarea.length; i++){
        data[i] = textarea[i].value
    }

    localStorage.setItem("table-data", JSON.stringify(data));
}


function printUserTable(days, count) {
    const table = document.getElementById("table");
    table.innerHTML = "";

    const userTable = document.createElement("table");
    userTable.classList.add("user-table");

    const tableHead = createTableHead(days);
    userTable.appendChild(tableHead);

    const tableBody = createTableBody(days, count);
    userTable.appendChild(tableBody);

    table.appendChild(userTable);
}

function createTableHead(days) {
    const tableHead = document.createElement("thead");
    const tableRow = document.createElement("tr");
    tableRow.innerHTML = `<th>№ занятия</th>
                        <th>Понедельник</th>
                        <th>Вторник</th>
                        <th>Среда</th>
                        <th>Четверг</th>
                        <th>Пятница</th>`;

    if (days === "6") {
        tableRow.innerHTML += `<th>Суббота</th>`;
    }

    tableHead.appendChild(tableRow);
    return tableHead;
}

function createTableBody(days, count) {
    const tableBody = document.createElement("tbody");

    for (let i = 0; i < count; i++) {
        const tableRow = document.createElement("tr");
        tableRow.id = `lesson-${i}`;
        tableRow.innerHTML = `
    <td class="lesson-number">${i + 1}</td>
    <td class="monday"><textarea name="monday-${i}"></textarea></td>
    <td class="tuesday"><textarea name="tuesday-${i}"></textarea></td>
    <td class="wednesday"><textarea name="wednesday-${i}"></textarea></td>
    <td class="thursday"><textarea name="thursday-${i}"></textarea></td>
    <td class="friday"><textarea name="friday-${i}"></textarea></td>`;

        if (days === "6") {
            tableRow.innerHTML += `<td class="saturday"><textarea type="text" name="saturday-${i}"></textarea></td>`;
        }

        tableBody.appendChild(tableRow);
    }

    return tableBody;
}

function createDivElement(className, textContent) {
    const div = document.createElement("div");
    div.className = className;
    div.textContent = textContent;
    return div;
}

function createButtonElement(className, textContent) {
    const button = document.createElement("button");
    button.className = className;
    button.type = "submit";
    button.textContent = textContent;
    return button;
}

function appendElements(parent, elements) {
    elements.forEach((element) => {
        parent.appendChild(element);
    });
}
