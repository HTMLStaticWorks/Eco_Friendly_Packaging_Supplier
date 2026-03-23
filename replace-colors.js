const fs = require('fs');
const path = require('path');

const dir = 'd:\\projects\\Eco-Friendly Packaging Supplier';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Replace text colors
    content = content.replace(/text-(red|blue|yellow|purple)-[1-9]00(\/\d+)?/g, 'text-leaf-green');
    // For text-red-600, etc.
    content = content.replace(/text-(red|blue|yellow|purple)-[1-9]00/g, 'text-leaf-green');

    // Replace background colors
    content = content.replace(/bg-(red|blue|yellow|purple)-[1-9]00\/(\d+)/g, 'bg-leaf-green/$2');
    content = content.replace(/bg-(red|blue|yellow|purple)-[1-9]00/g, 'bg-leaf-green');
    
    // Replace borders
    content = content.replace(/border-(red|blue|yellow|purple)-[1-9]00\/(\d+)/g, 'border-leaf-green/$2');
    content = content.replace(/border-(red|blue|yellow|purple)-[1-9]00/g, 'border-leaf-green');

    // Replace fill colors (for SVG icons)
    content = content.replace(/fill-(red|blue|yellow|purple)-[1-9]00/g, 'fill-leaf-green');

    fs.writeFileSync(path.join(dir, file), content);
});
console.log('Colors replaced successfully!');
