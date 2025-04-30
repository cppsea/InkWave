import { spawn } from "child_process";

/**
 * Helper function for getSummary
 * Runs a python subprocess that calls a python script
 * Path: file path of the script to run
 * Args: args passed to python function parameters (e.g., file path of the image)
 * Callback: returns the file path of the output file, expected in the same directory as models.py
 */
const runPython = (path : string, args : string) => {
    const pythonProcess = spawn("python", [path].concat(args), {
        cwd: "../../ml_models"
    });
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

export default runPython;