const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace "http://localhost:5000/some/path" with `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/some/path`
    // Note: this preserves the trailing path
    let newContent = content.replace(/['"`]http:\/\/localhost:5000([^'"`]*)['"`]/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}$1`");

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
