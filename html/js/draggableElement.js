class DraggableElement {
    /**
     * Note that the element must have an id.
     * The id will be used to save and restore the element position.
     *
     * @param {HTMLElement} element The HTML element you want to be draggable.
     * @param {boolean} savePosition Tells if the position of the element must be saved.
     */
    constructor(element, savePosition = true) {
        this.elem = element;
        this.savePosition = savePosition;

        // Initialize listeners
        this.elem.addEventListener('mousedown', e => this.onMouseDown(e));
        this.onMouseMoveCallback = e => this.onMouseMove(e);
        this.onMouseUpCallback = e => this.onMouseUp(e);
    }

    /**
     * @returns {{x: number, y: number}} The position of the element
     */
    getPosition() {
        const rect = this.elem.getBoundingClientRect();

        return {
            x: rect.x,
            y: rect.y
        };
    }

    /**
     * Save the position of the element
     */
    save() {
        const position = JSON.stringify(this.getPosition());
        localStorage.setItem(`${this.elem.id}-position`, position);
    }

    /**
     * Return the stored position of the element
     * @returns {{x: number, y: number}|undefined}
     */
    getStoredPosition() {
        const position = localStorage.getItem(`${this.elem.id}-position`);

        if (position === null) {
            return undefined;
        }

        return JSON.parse(position);
    }

    /**
     * Restore the saved position of the element
     */
    restorePosition() {
        const pos = this.getStoredPosition();

        if (pos) {
            this.move(pos.x, pos.y);
            return true;
        }

        return false;
    }

    /**
     * Set the new position of the element
     * @param x New X coordinate
     * @param y New Y coordinate
     */
    move(x, y) {
        this.elem.style.transform = `translate(${x}px, ${y}px)`;
    }

    /**
     * Handler for the event 'mousedown'
     * @param e Event
     */
    onMouseDown(e) {
        e.preventDefault();

        // Save the initial position of the cursor
        this.initX = e.clientX;
        this.initY = e.clientY;

        // Save the initial position of the element
        const rect = this.elem.getBoundingClientRect();
        this.initElemX = rect.x;
        this.initElemY = rect.y;

        // Add listeners
        document.addEventListener('mousemove', this.onMouseMoveCallback);
        document.addEventListener('mouseup', this.onMouseUpCallback);
    }

    /**
     * Handler for the event 'mousemove'
     * @param e Event
     */
    onMouseMove(e) {
        // e.preventDefault();

        // Math the difference between the initial cursor position and the current position
        const diffX = e.clientX - this.initX;
        const diffY = e.clientY - this.initY;

        // Math the new position of the element
        let newX = this.initElemX + diffX;
        let newY = this.initElemY + diffY;

        this.move(newX, newY);
    }

    /**
     * Handler for the event 'mouseup'
     * @param e Event
     */
    onMouseUp(e) {
        e.preventDefault();

        // Save the position of the element if needed
        if (this.savePosition) this.save();

        // Remove listeners when the mouse is up
        document.removeEventListener('mousemove', this.onMouseMoveCallback);
        document.removeEventListener('mouseup', this.onMouseUpCallback);
    }
}