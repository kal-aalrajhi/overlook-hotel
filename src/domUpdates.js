export const showElement = (element) => {
    element.classList.remove("hidden");
}

export const hideElement = (element) => {
    element.classList.add("hidden");
}

export const clearView = (view) => {
    view.innerHTML = "";
}