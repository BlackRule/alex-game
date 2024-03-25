import * as xml2js from 'xml2js';
import * as fs from "node:fs";
import * as path from "node:path";
const problemsPath = path.join(__dirname, 'host', 'ej', 'ejudge_data', '000001', 'problems')
const p = path.join(problemsPath, process.argv[3])
const XMLdata = fs.readFileSync(path.join(p, 'statement.xml'), {encoding: 'utf-8'})
const result = await xml2js.parseStringPromise(XMLdata);
// console.log(result.problem.examples[0].example)
const testsPath = path.join(p, 'tests')
fs.mkdirSync(testsPath);
let i = 1
for (const ex of result.problem.examples[0].example) {
  fs.writeFileSync(path.join(testsPath, `${i}.dat`), ex.input[0])
  fs.writeFileSync(path.join(testsPath, `${i}.ans`), ex.output[0])
  i++
}