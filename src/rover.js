#!/usr/bin/node

/**
 * NASA Rover - FoxBit Test
 *
 * @author John Murowaniecki <john@compilou.com.br>
 *
*/
import Terrain  from '../lib/Terrain.cjs';
import Rover    from '../lib/Rover.cjs';
import CARDINAL from '../lib/Cardinal.cjs';
import Console  from '../lib/Console.cjs';

/**
 * Starts a nerdy Console helper…
 */
const APP = new Console(
    'SatCom Array SW-42j',
    'Press `ESC` or `CTRL+C` to exit. Press `L`, `R` and `M` to drive.',
    {
        key: function _(keyPressed) {
            const key = keyPressed.toUpperCase();
            if ([
                'ESCAPE',
                'CTRL_C',
            ].indexOf(key) != -1) {
                APP.RobCo.clear();
                process.exit();
            }
            if (key.length === 1) {
                APP.lastKey = key;
                switch (key) {
                case 'R': vehicle.turnRight(); break;
                case 'L': vehicle.turnLeft();  break;
                case 'M': vehicle.move();      break;
                case 'F': vehicle.move(10);    break;
                }
            }
        }
    }
);


/**
 * Creates a new vehicle, dropping on x,y with North (default) orientation…
 */
const vehicle = new Rover({x: 1, y: 0}, 80, 1, Terrain, APP);

/**
 * Create a Human Interface for the Application…
*/
setInterval(() => {
    APP.window(1, 1, APP.max.row, APP.max.col, APP.mission, APP.description);

    APP.box(3, 3, 13, 21).at(3, 5, ' Rover Stats ');
    APP.at(5, 5, 'Coordinates');
    APP.at(6, 5, '').RobCo.inverse(`X: ${vehicle.position.x} Y: ${vehicle.position.y}`);
    APP.at(8, 5, 'Orientation');
    APP.at(9, 5, `${CARDINAL[vehicle.orientation+10]} `)
        .RobCo.inverse(`${CARDINAL[CARDINAL[vehicle.orientation]]}`);
    APP.at(11, 5, 'Energy/Fuel');
    APP.at(12, 5, `🗲 ${vehicle.fuel} `).RobCo('▓▓▓▓▓▒▒▒▒▒▒░░');

    APP.box(15, 3, 24, 21).at(15, 5, ' Details ');
    APP.at(17, 5, '░ smooth terrain');
    APP.at(19, 5, '▒ rough terrain');
    APP.at(21, 5, '▓ hard crossing');
    APP.at(23, 5, `${vehicle.icon} rover icon`);

    let tv = Terrain.view,
        furthestX = tv.x + APP.max.row - 2,
        furthestY = tv.y + APP.max.col - 25;

    APP.box(3, 24, APP.max.row - 2, APP.max.col - 25)
        .at(3, 28, [
            ` Terrain // viewport from {${Terrain.view.x},${Terrain.view.y}} to `,
            `{${furthestX},${furthestY}}`,
        ].join(''));

    Terrain.look(vehicle.position, APP.max);

    // Draw grounds…
    Terrain.terrain.slice(Terrain.view.x, Terrain.view.x + APP.max.row - 6)
        .forEach((ground, index) => {
            APP.at(4 + index, 25, ground
                .slice(Terrain.view.y, Terrain.view.y + APP.max.col - 27)
                .join(''));
        });

    // Fix rover positioning and draw the landing / dropsite in blinky bright green…
    let vehicle_pos_x =  4 + vehicle.position.x,
        vehicle_pos_y = 25 + vehicle.position.y;

    APP.blink(vehicle_pos_x, vehicle_pos_y, vehicle.icon);

    APP.blink(vehicle_pos_x+1, vehicle_pos_y, `${vehicle_pos_x},${vehicle_pos_y}`);

    if (APP.lastKey) {
        APP.at(APP.max.row - (APP.max.col > 80 ? 1 : 0), APP.max.col - 15, ` ${APP.lastKey} pressed… `);
    }

    APP.at(APP.max.row, 5, ` ${APP.max.row} x ${APP.max.col}`);

    APP.at(APP.max.row, 15, ` ${vehicle.position.x}x${vehicle.position.y}`);

}, 666);
