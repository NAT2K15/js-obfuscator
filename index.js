const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let JavaScriptObfuscator = require('javascript-obfuscator');
const config = require('./config.js')
const delay = ms => new Promise(res => setTimeout(res, ms));


rl.question(chalk.yellow `Please chose a file you would like to obfuscate:\n`, async(answer) => {
    if (answer.length == 0) {
        console.log(chalk.red `[ERROR]` + chalk.white ` Please make sure to provide a valid file path.`)
        await delay(2000)
        process.exit()
    } else {
        if (fs.existsSync(answer)) {
            fs.readFile(answer, "utf-8", async(err, data) => {
                if (err) {
                    console.log(chalk.red `[ERROR]` + chalk.white ` Please make sure to provide a valid file path.`)
                    await delay(2000)
                    process.exit()
                } else {
                    if (config.settings[config.prset]) {
                        rl.question(chalk.yellow `[FILE PATH]` + chalk.white ` What would you like the ouput file to be?\n`, async(answer2) => {
                            if (answer2.length == 0) {
                                console.log(chalk.red `[ERROR]` + chalk.white ` Please name a file a valid file path`)
                                await delay(2000)
                                process.exit()
                            } else {
                                let obfuscationResult = JavaScriptObfuscator.obfuscate(data, config.settings[config.prset])
                                fs.writeFile(`./output/${answer2}.js`, obfuscationResult.getObfuscatedCode(), async(err) => {
                                    if (err) {
                                        throw err
                                    } else {
                                        console.log(chalk.green `[SUCCESS]` + chalk.white ` I have created the locked file in ${__dirname}/output/${answer2}.js`)
                                        await delay(2000)
                                        process.exit()
                                    }
                                })
                            }
                        })

                    } else {
                        console.log(chalk.red `[ERROR]` + chalk.white ` Please fix your config and match the preset.`)
                        await delay(2000)
                        process.exit()
                    }

                }
            })
        } else {
            console.log(chalk.red `[ERROR]` + chalk.white ` Please make sure to provide a valid file path.`)
            process.exit()
        }
    }
})