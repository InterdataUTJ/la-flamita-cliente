import JsBarcode from "jsbarcode";

function crearBarcode(querySelector, token) {
  JsBarcode(querySelector, token, {
    format: "CODE128",
    lineColor: "#ffffff",
    background: "#f15d27",
    displayValue: false
  });
}

window.crearBarcode = crearBarcode;