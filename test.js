const { spawn: spawnProcess, execSync } = require("child_process");
const readline = require("readline");

class SpawnProcess {
  init() {
    throw new Error("SpawnProcess.init should be implemeted");
  }

  kill() {
    throw new Error("SpawnProcess.kill should be implemeted");
  }
}

class WindowsProcess extends SpawnProcess {
  init() {
    this.process = spawnProcess(
      ".\\node_modules\\.bin\\webpack-dev-server",
      [],
      {
        shell: true,
        stdio: "inherit",
      }
    );

    this.readline = readline.createInterface({
      input: process.stdin,
    });
  }

  kill() {
    this.readline.close();
    execSync(`taskkill /pid ${this.process.pid} /f /t`);
  }
}

class UnixProcess extends SpawnProcess {
  init() {
    this.process = spawnProcess("./node_modules/.bin/webpack-dev-server", [], {
      shell: true,
      stdio: [0, 1, 2, "ipc"],
    });
  }

  kill() {
    this.process.send("webpack-dev-server-stop");
  }
}

function createProcess() {
  if (/^win/.test(process.platform)) {
    return new WindowsProcess();
  } else {
    return new UnixProcess();
  }
}

let devServerProcess = createProcess();
devServerProcess.init();

setTimeout((_) => {
  devServerProcess.kill();
}, 5000);
