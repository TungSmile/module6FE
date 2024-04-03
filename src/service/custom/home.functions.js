export const supplChoosingEventListener = () => {
    const element = document.querySelector(".supply-choosing");
    if (element) {
        element.addEventListener("click", (e) => {
            console.log(e);
        })
    }
}

