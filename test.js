const { spawn: spawnProcess } = require("child_process");

let devServerProcess = spawnProcess(
    // ".\\node_modules\\.bin\\webpack-dev-server", [],
    "./node_modules/.bin/webpack-dev-server", [],
    { shell: true, stdio: "inherit" });

setTimeout(_ => {
    console.log("IS KILLED: ", devServerProcess.kill())
    console.log("Trying to kill webpack-dev-server...");
}, 5000);