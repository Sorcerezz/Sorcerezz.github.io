namespace L04 {

window.addEventListener("load", handleLoad);




function handleLoad(): void {
    let items: HTMLSelectElement = <HTMLSelectElement> document.getElementById ("item");
    let housetasks: HTMLSelectElement = <HTMLSelectElement> document.getElementById ("housetask");
    let bankings: HTMLSelectElement = <HTMLSelectElement> document.getElementById ("banking");

    for (let item: Item of tasks._grocery) {
    let option: HTMLOptionElement = document.createElement ("option");
    option.value = "0";
    option.text = item._name;
    items.append(option);
    }

    for (let housetask: Item of tasks._housekeeping) {
        let option: HTMLOptionElement = document.createElement ("option");
        option.value = "0";
        option.text = housetask._name;
        items.append(option);
        }

    for (let banking: Item of tasks._money) {
        let option: HTMLOptionElement = document.createElement ("option");
        option.value = "0";
        option.text = banking._name;
        items.append(option);
        }
}




}