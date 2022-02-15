/**
 * Class responsible for controlling aspects of the terrain and view.
 *
 * @class Terrain
 */
class Terrain {
    radius = 0;
    ground = ['▓', '▒', '░'];

    terrain = [];

    view = {
        x: 0,
        y: 0,
    };

    grass = false;

    life = false;

    /**
     * Creates an instance of Terrain.
     *
     * @param {Number} radiusSize Size of the generated map.
     * @memberof Terrain
     */
    constructor(radiusSize) {
        this.do(radiusSize);
    }

    do(radiusSize) {
        this.radius  = radiusSize || 666;
        this.terrain = new Array(this.radius).fill(new Array(this.radius).fill('░'));
        this.terrain = this
            .terrain.map(zoneRow =>
                zoneRow.map(() => this.ground[Math.floor(Math.random() * this.ground.length, 10)]));

        for (
            let ground = this.terrain, Num = '', n = 0;
            n < this.radius, ground[0][n * 10], ground[n * 10];
            n += 1, Num = String(n).split('').pop()
        ) {
            ground[0][n * 10] = Num;
            ground[n * 10][0] = Num;
        }
        return this;
    }

    /**
     * Method responsible for updating the viewport.
     *
     * @param {x: Number, y: Number} target Position of Interest.
     * @param {row: Number, col: Number} dimensions of Portrait/viewport.
     * @return {Array} Array of dimensions.
     * @memberof Terrain
     */
    look(target, dimensions) {

        let tv = this.view,
            am = dimensions,
            furthestX = tv.x + am.row,
            furthestY = tv.y + am.col;
        return [furthestX, furthestY];

        // Check if view is in sync with target…
        // if (target.x + 5 > furthestX) {
        //     this.view.x = target.x + 5;
        // }
        // if (target.y + 5 > furthestY) {
        //     this.view.y = target.y + 5;
        // }
        // Not implemented… Yet…
    }
}

module.exports = new Terrain;
