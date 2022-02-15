import assert from 'assert';

import Rover    from '../lib/Rover.cjs';
import Terrain  from '../lib/Terrain.cjs';

const vehicle = new Rover({x: 10, y: 10}, 80, 0, Terrain);

describe('Rover', function() {

    describe('Movements', function() {

        it('move North', function() {
            vehicle.move();
            assert.equal(vehicle.position.x, 9);
        });

        it('move South', function() {
            vehicle.turnRight();
            vehicle.turnRight();
            vehicle.move();
            assert.equal(vehicle.position.x, 10);
        });

        it('move East', function() {
            vehicle.turnLeft();
            vehicle.move();
            assert.equal(vehicle.position.y, 11);
        });

        it('move West', function() {
            vehicle.turnRight();
            vehicle.turnRight();
            vehicle.move();
            assert.equal(vehicle.position.y, 10);
        });

        it('move fast North', function() {
            vehicle.turnRight();
            vehicle.move(10);
            assert.equal(vehicle.position.x, 0);
        });
    });

    describe('Limits', function() {

        it('try to break the edge', function() {
            vehicle.move(10);
            assert.equal(vehicle.position.x, 0);
        });
    });
});
