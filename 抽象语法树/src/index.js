import parse from "./parse"
let templateStr = `<div>
        <h1 class="title topic item" id="myTitle">Hello</h1>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
        <div>
            <div>end</div>
        </div>
    </div>`
const ast = parse(templateStr)
console.log(ast);