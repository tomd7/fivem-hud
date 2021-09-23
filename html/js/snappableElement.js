class SnappableElement extends DraggableElement {
    /**
     * Note that the element must have an id.
     * The id will be used to save and restore the element position.
     *
     * @param {HTMLElement} element The HTML element you want to be draggable.
     * @param {boolean} savePosition Tells if the position of the element must be saved.
     * @param {boolean} snapOnCenter Tells if the snap feature must be enabled on the center onf the screen.
     */
    constructor(element, savePosition= true, snapOnCenter = true) {
        super(element, savePosition);

        this.verticalBar = document.getElementById('vertical-bar');
        this.horizontalBar = document.getElementById('horizontal-bar');

        this.offset = 5;
        this.areas = [];
        this.safeArea = {
            x: 0,
            y: 0,
            w: window.innerWidth,
            h: window.innerHeight,
            right: window.innerWidth,
            bottom: window.innerHeight
        };

        this.restorePosition();
    }

    /**
     * Set the new position of the element
     * @param x New X coordinate
     * @param y New Y coordinate
     */
    move(x, y) {
        const elemRect = this.elem.getBoundingClientRect();

        const left = x;
        const right = x + elemRect.width;
        const top = y;
        const bottom = y + elemRect.height;

        const leftOffset = left - this.offset;
        const rightOffset = right + this.offset;
        const topOffset = top - this.offset;
        const bottomOffset = bottom + this.offset;

        /* Snap the element on the safe area */
        if (leftOffset < this.safeArea.x) x = this.safeArea.x;
        if (topOffset < this.safeArea.y) y = this.safeArea.y;
        if (rightOffset > this.safeArea.right) x = this.safeArea.right - elemRect.width;
        if (bottomOffset > this.safeArea.bottom) y = this.safeArea.bottom - elemRect.height;
        /* ================================= */

        /* Snap the element on the center of the screen */
        const midX = (window.innerWidth / 2);
        const halfWidthElem = elemRect.width / 2;
        const midXElement = x + halfWidthElem;
        if (midXElement > (midX - this.offset) && midXElement < (midX + this.offset)) {
            x = midX - halfWidthElem;
            this.verticalBar.classList.remove('hidden');
        } else {
            this.verticalBar.classList.add('hidden');
        }

        const midY = (window.innerHeight / 2);
        const halfHeightElem = elemRect.height / 2;
        const midYElement = y + halfHeightElem;
        if (midYElement > (midY - this.offset) && midYElement < (midY + this.offset)) {
            y = midY - halfHeightElem;
            this.horizontalBar.classList.remove('hidden');
        } else {
            this.horizontalBar.classList.add('hidden');
        }
        /* ============================================ */

        super.move(x, y);
    }

    onMouseUp(e) {
        this.verticalBar.classList.add('hidden');
        this.horizontalBar.classList.add('hidden');
        super.onMouseUp(e);
    }

    /**
     * Set the area where the elements can be moved freely
     * @param x Top left X coordinate
     * @param y Top left Y coordinate
     * @param width Width of the safe area
     * @param height Height of the safe area
     */
    setSafeArea(x, y, width, height) {
        this.safeArea = {
            x: x,
            y: y,
            w: width,
            h: height,
            left: x,
            right: x + width,
            top: y,
            bottom: y + height
        };
    }

    /**
     * Add an area where an element can be snapped
     * @param {number} x Area X coordinate
     * @param {number} y Area Y coordinate
     * @param {number} width Area width
     * @param {number} height Area height
     */
    addArea(x, y, width, height) {
        return this.areas.push({
            x: x,
            y: y,
            w: width,
            h: height,
            left: x,
            right: x + width,
            top: y,
            bottom: y + height
        });
    }

    /**
     * Set the offset each snap area
     * @param {number} offset Default = 5px
     */
    setOffset(offset) {
        this.offset = offset;
    }
}
