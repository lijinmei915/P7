import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const importStr = "import ChapterPage2 from './pages/ChapterPage2';";
if (code.includes(importStr)) {
  code = code.replace(importStr, importStr + "\nimport ChapterPage3 from './pages/ChapterPage3';");
}

const typeStr = "'cover' | 'resume' | 'directory' | 'chapter' | 'insight1' | 'insight2' | 'persona' | 'survey' | 'signal' | 'directory2' | 'chapter2'";
const typeRepl = typeStr + " | 'directory3' | 'chapter3'";

const arrStr = "['cover', 'resume', 'directory', 'chapter', 'insight1', 'insight2', 'persona', 'survey', 'signal', 'directory2', 'chapter2']";
const arrRepl = "['cover', 'resume', 'directory', 'chapter', 'insight1', 'insight2', 'persona', 'survey', 'signal', 'directory2', 'chapter2', 'directory3', 'chapter3']";

code = code.replaceAll(typeStr, typeRepl);
code = code.replaceAll(arrStr, arrRepl);

const navFunc = "(id) => setCurrentPage(id === '01' ? 'chapter' : id === '02' ? 'chapter2' : 'chapter3')";

code = code.replace(
  `<DirectoryPage onNavigate={(id) => setCurrentPage(id === '01' ? 'chapter' : 'chapter2')} />`,
  `<DirectoryPage activeId="01" onNavigate={${navFunc}} />`
);
code = code.replace(
  `<DirectoryPage activeId="02" onNavigate={(id) => setCurrentPage(id === '01' ? 'chapter' : 'chapter2')} />`,
  `<DirectoryPage activeId="02" onNavigate={${navFunc}} />`
);

const ch2Block = `            {currentPage === 'chapter2' && (
              <ChapterPage2 />
            )}`;

const newBlock = `            {currentPage === 'chapter2' && (
              <ChapterPage2 />
            )}
            {currentPage === 'directory3' && (
              <DirectoryPage activeId="03" onNavigate={${navFunc}} />
            )}
            {currentPage === 'chapter3' && (
              <ChapterPage3 />
            )}`;

code = code.replace(ch2Block, newBlock);

code = code.replace("<span className=\"text-gray-400 font-medium\">11</span>", "<span className=\"text-gray-400 font-medium\">13</span>");

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated for directory3');
