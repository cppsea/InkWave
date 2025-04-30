import { spawn } from "child_process";
import fs from "fs";
import path from "path";

function runPython(path : string, args : string) {
    console.log("testing python call...");
    // const pythonProcess = spawn("python", [path].concat(args));
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
            console.log("Data:");
        }
    })
}

// runPython("test.py", "hello python!", (result: any) => {
//     console.log(result);
// });

// runPython("test.py", "./filepath", (result: String) => {
//     const file = fs.readFileSync(path.join(__dirname, result.replace(/(\r\n)/gm, "")), { encoding: 'utf-8' });
//     console.log(file);
// });

// runPython("../../ml_models/run_cv_llm.py", "../../ml_models/Test Images/digital.png", (result : string) => {
//     const txtFile = fs.readFileSync(path.join(__dirname, result), { encoding: 'utf-8' });
//     console.log(txtFile);
// })

runPython("../../../ml_models/run_cv_llm.py", "./Test Images/digital.png");
runPython("../../../ml_models/run_nlp_md.py", "./cv_output.txt");
const txtFile : String = fs.readFileSync(path.join(__dirname, "../../ml_models/nlp_output.md"), { encoding: 'utf-8' });
console.log(txtFile);