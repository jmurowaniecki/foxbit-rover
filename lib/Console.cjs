/**
 * Class responsible for handling user terminal and console inteerfacec.
 *
 * @class Console
 */
class Console {

    constructor(mission, description, actions) {
        this.mission     = mission;
        this.description = description;
        this.lastKey     = null;
        this.RobCo       = require('terminal-kit')
            .terminal
            .windowTitle(mission)
            .iconName('fallout')
            .bgBlack()
            .colorRgb(42, 169, 51);

        this.RobCo.grabInput();
        this.RobCo.clear();

        for (const action in actions) {
            if (Object.hasOwnProperty.call(actions, action)) {
                const program = actions[action];
                this.RobCo.on(action, program);
            }
        }
    }

    get events() {
        return this.RobCo.on;
    }

    get max() {
        return {
            row: process.stdout.rows,
            col: process.stdout.columns,
        };
    }

    clear() { this.RobCo.clear(); }

    box(y, x, h, w) {
        const term = this.RobCo,
            z = w - 2;

        for (let n = 1+y; n <= h; n++) {
            term.moveTo(x, n)('│' + ' '.repeat(z) + '│');
        }
        {
            term.moveTo(x, y)('╭' + '─'.repeat(z) + '╮');
            term.moveTo(x, h)('╰' + '─'.repeat(z) + '╯');
            term.moveTo(x+1, y+1)
                .wrapColumn(z);
        }

        return this;
    }

    at(y, x, text) {
        this.RobCo
            .moveTo (x, y)(text);
        return this;
    }

    window(y, x, h, w, title, statusBar) {
        this.box(x, y, h, w);
        this.at(x, y + 3).RobCo(' RobCo Industries //').brightGreen(` ${title} `);
        this.at(h-1, y+1).RobCo.colorRgb(42, 169, 51)(statusBar);
    }

    blink(x, y, obj) {
        this.at(x, y).RobCo.brightGreen.blink(obj).colorRgb(42, 169, 51)('');
    }
}


module.exports = Console;
