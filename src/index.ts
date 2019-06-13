import Vue from "vue";
import DesignerCanvas from "./designerCanvas";
import {fabric} from 'fabric';
import App from "./App";

/**
 * Root class with the stub data
 */

//#region Main Application Parts
//1. UI interface
const viewModel = new Vue(App).$mount("#app");
//2. Canvas
const designerCanvas = new DesignerCanvas();
//#endregion

//#region work with UI
//send data to UI ()
viewModel.setData({
    selectedText: {
        text: "",
        font: "Comic Sans",
        color: "#FF0000"
    }
});

//listen data from UI
viewModel.$on("exportSVG", function () {
    let xml = designerCanvas.canvas.toSVG();
    // console.log(xml);
    viewModel.setSVG(xml);

viewModel.$on("importSVG", function (svg) {
    designerCanvas.canvas.clear();

    fabric.loadSVGFromURL(svg, function (objects, options) {
        let obj = fabric.util.groupSVGElements(objects, options);
        designerCanvas.canvas.add(obj).renderAll();
    });
});

viewModel.$on("toFrontClick", function () {
    designerCanvas.canvas.bringToFront(designerCanvas.canvas.getActiveObject());
});

viewModel.$on("toBackClick", function () {
    designerCanvas.canvas.sendToBack(designerCanvas.canvas.getActiveObject());
});

viewModel.$on("deleteClick", function () {
    designerCanvas.canvas.remove(designerCanvas.canvas.getActiveObject());
});

viewModel.$on("addText", function (value) {
    let top = Math.floor(Math.random() * 350) + 1;
    let left = Math.floor(Math.random() * 300) + 1;

    let text = new fabric.Text(value.text, {
        fontFamily: value.font,
        fill: value.color,
        top: top,
        left: left
    });
    designerCanvas.canvas.add(text);
});

viewModel.$on("importIMG", function (file) {
    designerCanvas.addPhoto(
        file,
        {left: 50, top: 50}
    );
});

//#endregion

//#region work with canvas
designerCanvas.addPhoto(
    "https://live.staticflickr.com/5031/7430761556_c3e7b6c321_m.jpg",
    {left: 10, top: 10}
);
designerCanvas.addPhoto(
    "https://live.staticflickr.com/7039/6835581528_e747fd91fe_q.jpg",
    {left: 210, top: 90, filter: "grayscale"}
);

designerCanvas.canvas.add(
    new fabric.Text("I'm green text", {
        fill: "#009900",
        left: 10,
        top: 300
    })
);
//#endregion
