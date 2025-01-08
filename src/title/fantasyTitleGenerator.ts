import { Flavours } from './Flavours';
import * as wordsAndAdjectives from './wordsAndAdjectives.json';

function nounsOnlyGen(noun1, noun2) {
  return 'The ' + noun1 + ' of (the) ' + noun2;
}
function threeNounsGen(noun1, noun2, noun3) {
  if ((!noun2.endsWith('s') && !noun2.endsWith('y')) || noun2 == 'Boy')
    noun2 += '(s)';
  if (noun2.endsWith('y') && noun2 != 'Boy') {
    noun2 = noun2.slice(0, -1);
    noun2 += 'ies';
  }
  if ((!noun3.endsWith('s') && !noun3.endsWith('y')) || noun3 == 'Boy')
    noun3 += '(s)';
  if (noun3.endsWith('y') && noun3 != 'Boy') {
    noun3 = noun3.slice(0, -1);
    noun3 += 'ies';
  }
  return 'The ' + noun1 + ' of ' + noun2 + ' and ' + noun3;
}
function adjNounGen(adj, noun) {
  return 'The ' + adj + ' ' + noun;
}
function leftAdjGen(adj, noun1, noun2) {
  return 'The ' + adj + ' ' + noun1 + ' of (the) ' + noun2;
}
function rightAdjGen(adj, noun1, noun2) {
  return 'The ' + noun1 + ' of (the) ' + adj + ' ' + noun2;
}
function bothAdjGen(adj1, adj2, noun1, noun2) {
  return 'The ' + adj1 + ' ' + noun1 + ' of (the) ' + adj2 + ' ' + noun2;
}
function twoNounsGen(noun1, noun2) {
  return 'The ' + noun1 + ' and the ' + noun2;
}
const { nouns, adjectives } = wordsAndAdjectives;
export function generateTitle(val: string) {
  var nounsLen = nouns.length;
  var adjsLen = adjectives.length;

  var noun1 = Math.floor(Math.random() * nounsLen);
  var noun2 = Math.floor(Math.random() * nounsLen);
  var noun3 = Math.floor(Math.random() * nounsLen);
  var adj1 = Math.floor(Math.random() * adjsLen);
  var adj2 = Math.floor(Math.random() * adjsLen);

  var title;

  var rndfunc = Math.floor(Math.random() * 7);

  if (val == Flavours.NOUNS_ONLY || (val == Flavours.RANDOM && rndfunc == 0)) {
    title = nounsOnlyGen(nouns[noun1], nouns[noun2]);
  } else if (
    val == Flavours.THREE_NOUNS ||
    (val == Flavours.RANDOM && rndfunc == 1)
  ) {
    title = threeNounsGen(nouns[noun1], nouns[noun2], nouns[noun3]);
  } else if (
    val == Flavours.ADJ_NOUN ||
    (val == Flavours.RANDOM && rndfunc == 2)
  ) {
    title = adjNounGen(adjectives[adj1], nouns[noun1]);
  } else if (
    val == Flavours.LEFT_ADJ ||
    (val == Flavours.RANDOM && rndfunc == 3)
  ) {
    title = leftAdjGen(adjectives[adj1], nouns[noun1], nouns[noun2]);
  } else if (
    val == Flavours.RIGHT_ADJ ||
    (val == Flavours.RANDOM && rndfunc == 4)
  ) {
    title = rightAdjGen(adjectives[adj1], nouns[noun1], nouns[noun2]);
  } else if (
    val == Flavours.BOTH_ADJ ||
    (val == Flavours.RANDOM && rndfunc == 5)
  ) {
    title = bothAdjGen(
      adjectives[adj1],
      adjectives[adj2],
      nouns[noun1],
      nouns[noun2],
    );
  } else if (
    val == Flavours.TWO_NOUNS ||
    (val == Flavours.RANDOM && rndfunc == 6)
  ) {
    title = twoNounsGen(nouns[noun1], nouns[noun2]);
  }
  return title;
}

// https://codepen.io/paracactus/pen/pogYGBJ
