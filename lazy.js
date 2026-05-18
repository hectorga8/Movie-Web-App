const fs = require('fs');
const path = require('path');

function findFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(filePath, ext));
    } else if (file.endsWith(ext)) {
      results.push(filePath);
    }
  });
  return results;
}

const files = findFiles('frontend/src', '.jsx');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Skip adding lazy loading to above-the-fold images
  if (!file.includes('DetailHero') && !file.includes('LandingHero') && !file.includes('IndexBanner')) {
    const newContent = content.replace(/<img(?![^>]*loading=['"]lazy['"])/g, '<img loading="lazy"');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent);
      modifiedCount++;
      console.log('Modified:', file);
    }
  }
});
console.log('Total modified files: ' + modifiedCount);
