// @ts-ignore
const cloner = require('hapiclone');
// @ts-ignore
const rimraf = require('rimraf');
const path = require('path');
const commander = require('commander');
const colors = require('colors');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
commander
    .option('-c, --component <moduleName>', 'remove components')
    .option('-p, --page <moduleName>', 'remove pages')
    .action(function (cmd, opts) {
        const { component, page } = opts;
        let source = './src/';
        if (component) {
            source += 'components/' + commander.component;
        } else if (page) {
            source += 'pages/' + commander.page;
        }
        // @ts-ignore
        question('👽 是否确认删除该模块？', 'yes', function (ans) {
            if (ans.toLocaleUpperCase() === 'YES' || ans.toLocaleUpperCase() === 'Y') {
                rimraf.sync(source);
                process.exit(0);
            }
        });
    })
commander.parse(process.argv)

// @ts-ignore
function question(quest, arg, callback) {
    rl.question('? '.green + quest + (arg ? '(' + arg.gray + ')' : '') + '：', ans => {
        callback instanceof Function && callback(ans || arg)
    })
}
