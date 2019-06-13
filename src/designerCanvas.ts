import {fabric} from "fabric";

/**
 * Class stub to operate with the canvas and it's obects
 */
export class DesignerCanvas {
    public canvas;
    width = 400;
    height = 400;

    constructor() {
        this.canvas = new fabric.Canvas("fabric-canvas");
        this.canvas.setHeight(this.width);
        this.canvas.setWidth(this.height);
    }

    public addPhoto(url, options) {
        fabric.Image.fromURL(
            url,
            img => {
                img.set(options);
                this.canvas.add(img);

                if (options.filter === "Grayscale") {
                    img.filters.push(new fabric.Image.filters.Grayscale());
                    img.applyFilters();
                } else if (options.filter === "Pixelate") {
                    img.filters.push(new fabric.Image.filters.Pixelate({
                        blocksize: 8
                    }));
                    img.applyFilters();
                }
            },
            {
                crossOrigin: "Anonymous"
            }
        );
    }
}

export default DesignerCanvas;
