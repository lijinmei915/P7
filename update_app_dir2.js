import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

const typeStr = "'cover' | 'resume' | 'directory' | 'chapter' | 'insight1' | 'insight2' | 'persona' | 'survey' | 'signal' | 'chapter2'";
const typeRepl = "'cover' | 'resume' | 'directory' | 'chapter' | 'insight1' | 'insight2' | 'persona' | 'survey' | 'signal' | 'directory2' | 'chapter2'";

const arrStr = "['cover', 'resume', 'directory', 'chapter', 'insight1', 'insight2', 'persona', 'survey', 'signal', 'chapter2']";
const arrRepl = "['cover', 'resume', 'directory', 'chapter', 'insight1', 'insight2', 'persona', 'survey', 'signal', 'directory2', 'chapter2']";

code = code.replaceAll(typeStr, typeRepl);
code = code.replaceAll(arrStr, arrRepl);

const ch2Block = `            {currentPage === 'chapter2' && (
              <ChapterPage2 />
            )}`;

const newBlock = `            {currentPage === 'directory2' && (
              <DirectoryPage activeId="02" onNavigate={(id) => setCurrentPage(id === '01' ? 'chapter' : 'chapter2')} />
            )}
            {currentPage === 'chapter2' && (
              <ChapterPage2 />
            )}`;

code = code.replace(ch2Block, newBlock);

code = code.replace("<span className=\"text-gray-400 font-medium\">10</span>", "<span className=\"text-gray-400 font-medium\">11</span>");

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated for directory2');
