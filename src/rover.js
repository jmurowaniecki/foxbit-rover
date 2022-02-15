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
import net      from 'net';

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

var server = net.createServer(function(socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
    socket.on('error', erro => APP.currier.push(erro));
    socket.on('data',  data => APP.socket .push(data));
});
server.listen(4815, '127.0.0.1');

/**
 * Creates a new vehicle, dropping on x,y with North (default) orientation…
 */
const vehicle = new Rover({x: 1, y: 0}, 80, 1, Terrain, APP);

/**
 * Create a Human Interface for the Application…
*/
function main() {
    APP.window(1, 1, APP.max.row, APP.max.col, APP.mission, APP.description);

    APP.box(3, 3, 13, 24).at(3, 5, ' Rover Stats ');
    APP.at(5, 5, 'Coordinates');
    APP.at(6, 5, '').RobCo.inverse(`X: ${vehicle.position.x} Y: ${vehicle.position.y}`);
    APP.at(8, 5, 'Orientation');
    APP.at(9, 5, `${CARDINAL[vehicle.orientation+10]} `)
        .RobCo.inverse(`${CARDINAL[CARDINAL[vehicle.orientation]]}`);
    APP.at(11, 5, 'Energy/Fuel');
    APP.at(12, 5, `🗲 ${vehicle.fuel} `).RobCo('▓▓▓▓▓▒▒▒▒▒▒░░░░');

    APP.box(14, 3, 23, 24).at(14, 5, ' Details ');
    APP.at(16, 5, '░ smooth terrain');
    APP.at(18, 5, '▒ rough terrain');
    APP.at(20, 5, '▓ hard crossing');
    APP.at(22, 5, `${vehicle.icon} rover icon`);

    APP.box(24, 3, APP.max.row - 2, 24).at(24, 5, ' Server ');
    APP.at(26, 5).RobCo.inverse('tcp://127.0.0.1:4815');
    // APP.socket.slice()
    APP.socket.slice(-4).forEach((tx, i) => {
        APP.at(27 + i, 4, `${i == 0 ? '>' : ''} ${tx}`.substring(0, 21));
    });

    let tv = Terrain.view,
        furthestX = tv.x + APP.max.row - 2,
        furthestY = tv.y + APP.max.col - 25;

    APP.box(3, 27, APP.max.row - 2, APP.max.col - 27)
        .at(3, 29, [
            ` Terrain // viewport from {${Terrain.view.x},${Terrain.view.y}} to `,
            `{${furthestX},${furthestY}}`,
        ].join(''));

    Terrain.look(vehicle.position, APP.max);

    // Draw grounds…
    Terrain.terrain.slice(Terrain.view.x, Terrain.view.x + APP.max.row - 6)
        .forEach((ground, index) => {
            APP.at(4 + index, 28, ground
                .slice(Terrain.view.y, Terrain.view.y + APP.max.col - 29)
                .join(''));
        });

    // Fix rover positioning and draw the landing / dropsite in blinky bright green…
    let vehicle_pos_x =  4 + vehicle.position.x,
        vehicle_pos_y = 28 + vehicle.position.y;

    APP.blink(vehicle_pos_x, vehicle_pos_y, vehicle.icon);
    APP.blink(vehicle_pos_x+1, vehicle_pos_y, `${vehicle_pos_x},${vehicle_pos_y}`);

    if (APP.lastKey) {
        APP.at(APP.max.row - (APP.max.col > 80 ? 1 : 0), APP.max.col - 15, ` ${APP.lastKey} pressed… `);
    }

    // APP.at(APP.max.row, 5, ` ${APP.max.row} x ${APP.max.col}`);
    // APP.at(APP.max.row, 15, ` ${vehicle.position.x}x${vehicle.position.y}`);
}

setInterval(main, 666);
