import { spawn } from "child_process";

function runPython(path : string, args : string) {
    console.log("testing python call...");
    console.log(args);
    const pythonProcess = spawn("python", [path].concat(args));
    let data = "";
    
    pythonProcess.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });
    pythonProcess.stderr.on("data", (err) => {
        console.error(`stderr: ${err}`);
    });
    pythonProcess.on("close", (code) => {
        if (code != 0) {
            console.log(`${code}`);
        }
        else {
            console.log(data);
        }
    })
}

runPython("test.py", "hello python!");