import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { Options } from './options';

const prefixes = [
  'Original',
  'High Quality',
  'Advanced', 
  'Highly Sophisticated',
  'Accelerated',
  'Enhanced',
  'Tuned',
  'High voltage',
  'Top notch',
  'Cutting edge'
];

const suffixes = [
  'TM',
  'Plus',
  '3000',
  'Power Edition',
  'Limited',
  'Delux',
  'Reloaded'
]; 

function random(list: string[], count: number): string[] {
  const result: string[] = [];

  while (result.length < count) {
    const candidate = list[Math.floor(Math.random() * list.length)];
    if (result.indexOf(candidate) == -1) {
      result.push(candidate);
    }
  }

  return result;
}

export function awesomeProductName(options: Options): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    
    const pre = random(prefixes, options.coolness);
    const post = random(suffixes, options.coolness);

    const preString = pre.join(' ');
    const postString = post.join(' ');
    
    let result = preString + ' ' + options.internalName + ' ' + postString;

    if (options.compound) {
      result = result.replace(' ', '');
    }

    console.debug('Result: ', result);

    const fileName = 'product-name.txt';
    if (tree.exists(fileName)) {
      tree.overwrite('product-name.txt', result);
    }
    else {
      tree.create('product-name.txt', result);
    }
    

    return tree;
  };
}
