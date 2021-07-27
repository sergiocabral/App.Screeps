import { ExampleClass } from './ExampleClass';
import { HelperList } from '@sergiocabral/helper';

const exampleClass = new ExampleClass();
const randomLetter = HelperList.getRandom(['a', 'b', 'c', 'd']);

console.log(
  'Rocking in Screeps! With TypeScript and NPM. Luck Number: ' +
    exampleClass.getRandomValue() +
    randomLetter
);
