export function openman() {
    const manStatus = sessionStorage.getItem("man")
    if (manStatus !== "close"){
    const man = document.getElementById("manCont");
    man.style.display = "block";
    }
}