/**
 * Class responsible for controlling aspects of the rover vehicle and his movement.
 *
 * @class Rover
 */
class Rover {

    constructor(position, fuel, orientation, terrain, controller) {
        this.position    = position    || { x: 0, y: 0};
        this.fuel        = fuel        || 100;
        this.orientation = orientation || 0;
        this.terrain     = terrain;
        this.controller  = controller;
    }

    get icon() {
        return ['▲', '▶', '▼', '◄'][this.orientation];
    }

    turnRight() {
        this.orientation++;
        if (this.orientation > 3) {
            this.orientation = 0;
        }
    }

    turnLeft() {
        this.orientation--;
        if (this.orientation < 0) {
            this.orientation = 3;
        }
    }

    move(steps) {
        steps = steps || 1;

        switch (this.orientation) {
        case 0: this.position.x -= steps; break;
        case 1: this.position.y += steps; break;
        case 2: this.position.x += steps; break;
        case 3: this.position.y -= steps; break;
        }
        // Handles map edges…
        if (this.position.x < 0) { this.position.x = 0; this.terrain.view.x = 0; }
        if (this.position.y < 0) { this.position.y = 0; this.terrain.view.y = 0; }
        if (this.position.x > this.terrain.radius) { this.position.x = this.terrain.radius; this.terrain.view.x = this.terrain.radius; }
        if (this.position.y > this.terrain.radius) { this.position.y = this.terrain.radius; this.terrain.view.y = this.terrain.radius; }
    }
}

module.exports = Rover;
