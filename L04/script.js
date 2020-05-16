"use strict";
var L04;
(function (L04) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let items = document.getElementById("item");
        let housetasks = document.getElementById("housetask");
        for (let item of L04.tasks._grocery) {
            let option = document.createElement("option");
            option.value = "0";
            option.text = item._name;
            items.append(option);
        }
    }
})(L04 || (L04 = {}));
//# sourceMappingURL=script.js.map