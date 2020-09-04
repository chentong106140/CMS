const path = require('path');

export default function printMe() {
    console.log(path.resolve(__dirname, 'dist'));
    console.log(path.resolve(process.cwd(), 'dist'));
}
