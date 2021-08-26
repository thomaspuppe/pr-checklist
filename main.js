const checkboxValues = JSON.parse(localStorage.getItem("checkboxValues")) || {},
    labels = Array.from(document.querySelectorAll(".checklist-item__title")),
    checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')),
    checkboxesLength = checkboxes.length,
    progress = document.querySelector(".progress__bar"),
    counter = document.querySelector(".progress__count"),
    reset = document.querySelector(".progress__reset");

function loadIds() {
    const getIdFromLabel = label => label.replace(/[ ,.!?;:'-]/g, "").toLowerCase();
    for (let a = 0; a < checkboxesLength; a += 1) {
        const currentCheckbox = checkboxes[a];
        const label = currentCheckbox.nextSibling.querySelector('.checklist-item__title').innerText;
        const currentId = getIdFromLabel(label);
        currentCheckbox.id = currentId;
        currentCheckbox.nextSibling.setAttribute( "for", currentId );
    }
}

function updateStorage(a) {
    (checkboxValues[a.id] = a.checked), localStorage.setItem(
        "checkboxValues",
        JSON.stringify(checkboxValues)
    );
}

function countChecked() {
    if ("checkbox" === this.type) {
        const a = this.parentNode.parentNode.parentNode,
            b =
                a.querySelectorAll("input:checked").length /
                a.querySelectorAll(".checklist-item").length;
        a.querySelector(
            ".checklist__percentage-border"
        ).style.transform = `scaleX(${b})`;
    } else
        Array.from(document.querySelectorAll(".checklist")).forEach(a => {
            const b =
                a.querySelectorAll("input:checked").length /
                a.querySelectorAll(".checklist-item").length;
            a.querySelector(
                ".checklist__percentage-border"
            ).style.transform = `scaleX(${b})`;
        });
    let a = 0;
    Array.from(document.querySelectorAll("input:checked")).forEach(() => {
        a += 1;
    }), (counter.innerText = `${a}/${checkboxesLength}`), (progress.style.transform = `scaleX(${a /
        checkboxesLength})`), (checkboxValues.globalCounter = a), updateStorage(this);
}
function loadValues() {
    const a = checkboxValues.globalCounter || 0;
    (counter.innerText = `${a}/${checkboxesLength}`), Object.keys(
        checkboxValues
    ).forEach(a => {
        "globalCounter" !== a &&
            (document.getElementById(a).checked = checkboxValues[a]);
    }), countChecked();
}
function resetCheckboxes() {
    this.classList.add("progress__reset--pressed"), checkboxes.forEach(
        a => (a.checked = !1)
    ), Object.keys(checkboxValues).forEach(
        a => delete checkboxValues[a]
    ), countChecked();
}
window.onload = function() {
    loadIds(), loadValues(), checkboxes.forEach(a =>
        a.addEventListener("click", countChecked)
    ), reset.addEventListener("click", resetCheckboxes), reset.addEventListener(
        "animationend",
        function() {
            this.classList.remove("progress__reset--pressed");
        },
        !1
    )
};
