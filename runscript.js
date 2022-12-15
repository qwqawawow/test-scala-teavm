import { readFile } from 'fs';
import { JSDOM } from 'jsdom';
import { Script } from "vm"
readFile('./classes.js', (err, data) => {
  if (err) throw err;


  global.a = 1
  global.b = 123
  global.jsdom = new JSDOM()
  const script = new Script(data.toString() + `
main()



`)

  const script2 = new Script(data.toString() + `
main()
console.log(a)
console.log(b)
console.log(jsdom)

`)

  const vmContext = new JSDOM(``, { runScripts: "dangerously", resources: 'usable' }).getInternalVMContext()
  const vmContext2 = new JSDOM(``, { runScripts: "dangerously", resources: 'usable' }).getInternalVMContext()
  script.runInContext(vmContext)
  script2.runInThisContext(vmContext2)
});



