// @ts-ignore
const cloner = require('hapiclone');
const path = require('path');
const commander = require('commander');
const colors = require('colors');
commander
    .command('new <dest>')
    .action(function (arg1) {
        var cloneman = new cloner(path.resolve(__dirname, './@Comp'), path.resolve(process.cwd(), './src/components') + '/' + arg1);
        cloneman.clone();
        console.log('复制完成'.green);
    })
    commander
    .command('create <dest>')
    .action(function (arg1) {
        var cloneman = new cloner(path.resolve(__dirname, './@TPL'), path.resolve(process.cwd(), './src/pages') + '/' + arg1);
        cloneman.clone();
        console.log('复制完成'.green);
    })
commander.parse(process.argv)
