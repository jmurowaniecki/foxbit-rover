import assert   from 'assert';
import Terrain  from '../lib/Terrain.cjs';

describe('Terrain', function() {

    describe('Ground', function() {

        it('Has no grass', function() {
            assert.equal(Terrain.grass, false);
        });

        it('Has no life', function() {
            assert.equal(Terrain.life, false);
        });

        it('`Possible` has no other world like', function() {
            const original = Terrain.do(10),
                clone      = Object.assign(Terrain, {});
            assert.notEqual(
                original.terrain[0].join(''),
                clone.do(10).terrain[0].join('')
                );
        });
    });
});
