import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import postcss from 'postcss';

const checkOnly = process.argv.includes('--check');
const cssFiles = [];

function collectCssFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) collectCssFiles(file);
    else if (entry.name.endsWith('.css')) cssFiles.push(file);
  }
}

function structure(node) {
  const item = { type: node.type };
  for (const key of ['name', 'params', 'selector', 'prop', 'value', 'important', 'text']) {
    if (node[key] !== undefined) item[key] = node[key];
  }
  if (node.nodes) item.nodes = node.nodes.map(structure);
  return item;
}

function formatNode(node, depth, first = false) {
  const indent = '  '.repeat(depth);
  node.raws.before = depth === 0 ? (first ? '' : '\n\n') : `\n${indent}`;

  if (node.type === 'decl') {
    node.raws.between = ': ';
    return;
  }

  if (node.type === 'comment') {
    node.raws.left = ' ';
    node.raws.right = ' ';
    return;
  }

  if (!node.nodes) return;

  node.raws.between = ' ';
  node.raws.semicolon = true;
  node.nodes.forEach((child, index) => formatNode(child, depth + 1, index === 0));
  node.raws.after = node.nodes.length ? `\n${indent}` : '';
}

collectCssFiles('src');
let changed = 0;

for (const file of cssFiles) {
  const original = readFileSync(file, 'utf8');
  const ast = postcss.parse(original, { from: file });
  const before = JSON.stringify(structure(ast));

  ast.nodes.forEach((node, index) => formatNode(node, 0, index === 0));
  ast.raws.after = '\n';
  const formatted = ast.toString();

  const after = JSON.stringify(structure(postcss.parse(formatted, { from: file })));
  if (before !== after) throw new Error(`Formatting changed CSS structure in ${file}`);

  if (formatted !== original) {
    changed += 1;
    if (!checkOnly) writeFileSync(file, formatted);
    console.log(`${checkOnly ? 'Needs formatting' : 'Formatted'}: ${file}`);
  }
}

console.log(`${changed} of ${cssFiles.length} CSS files ${checkOnly ? 'need formatting' : 'formatted'}.`);
if (checkOnly && changed) process.exitCode = 1;
