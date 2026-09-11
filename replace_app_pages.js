import fs from 'fs';
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add import
const importStr = "import PersonaPage from './pages/PersonaPage';";
if (code.includes(importStr)) {
  code = code.replace(importStr, importStr + "\nimport ChapterPage2 from './pages/ChapterPage2';");
}

// Replace Type and Array
const pageTypeStr = "'cover' | 'resume' | 'directory' | 'chapter' | 'insight1' | 'insight2' | 'persona' | 'survey' | 'signal'";
const pageTypeReplacement = "'cover' | 'resume' | 'directory' | 'chapter' | 'insight1' | 'insight2' | 'persona' | 'survey' | 'signal' | 'chapter2'";

const pageArrayStr = "['cover', 'resume', 'directory', 'chapter', 'insight1', 'insight2', 'persona', 'survey', 'signal']";
const pageArrayReplacement = "['cover', 'resume', 'directory', 'chapter', 'insight1', 'insight2', 'persona', 'survey', 'signal', 'chapter2']";

// State definition
code = code.replaceAll(pageTypeStr, pageTypeReplacement);
code = code.replaceAll(pageArrayStr, pageArrayReplacement);

// Navigation routing in DirectoryPage
const dirPageStr = "<DirectoryPage onNavigate={() => setCurrentPage(\"chapter\")} />";
const dirPageRepl = "<DirectoryPage onNavigate={(id) => setCurrentPage(id === '02' ? 'chapter2' : 'chapter')} />";
code = code.replace(dirPageStr, dirPageRepl);

// Add to switch/render block
const signalBlock = `            {currentPage === 'signal' && (
              <SignalDecayPage />
            )}`;
const chapter2Block = `            {currentPage === 'signal' && (
              <SignalDecayPage />
            )}
            {currentPage === 'chapter2' && (
              <ChapterPage2 />
            )}`;
code = code.replace(signalBlock, chapter2Block);

// update total pages
code = code.replace("<span className=\"text-gray-400 font-medium\">09</span>", "<span className=\"text-gray-400 font-medium\">10</span>");

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx updated');
