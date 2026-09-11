import fs from 'fs';
let code = fs.readFileSync('src/data/notes.ts', 'utf8');

const strToAppend = `  'chapter2': [
    "接下来，我们进入第二个核心案例：LiveBoard 动态报告。",
    "我们将展示如何利用 AI Agent 与对话式交互，打破静态图表的局限，让数据查询与下钻分析变得前所未有的流畅与智能。"
  ]
};`;

code = code.replace("};", strToAppend);
fs.writeFileSync('src/data/notes.ts', code);
console.log('Appended notes');
