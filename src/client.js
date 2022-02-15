import { Socket } from 'net';
import readline from 'readline';

var client = new Socket();

client.connect(4815, '127.0.0.1', function() {
    const reader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    reader.question('Start position `Xlat` `Ylong` `direction`: ', function (position) {
        reader.question('Commands `R`, `L`, `M`: ', function (commands) {
            console.log('Sending message to rover…');

            client.write(position);
            client.write(commands);

            reader.close();
        });

    });
    // client.write('13 9 E');
    // client.write('RMMMMMMRMMMMMMMMLMMMMMMMMLMMMMMMMRMMMM');

    reader.on('close', function () {
        process.exit(0);
    });
});

client.on('close', function() {
    console.log('Connection closed');
});
