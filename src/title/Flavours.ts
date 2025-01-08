export const enum Flavours {
  RANDOM = 'random', // Random
  NOUNS_ONLY = 'nounsOnly', // The [x] of [y]
  ADJ_NOUN = 'adjNoun', // The [x][y]
  THREE_NOUNS = 'threeNouns', // The [x] of [y] and [z]
  TWO_NOUNS = 'twoNouns', // The [x] and the [y]
  LEFT_ADJ = 'leftAdj', //The [x][y] of the [z]
  RIGHT_ADJ = 'rightAdj', // The [x] of [y][z]
  BOTH_ADJ = 'bothAdj', // The [w][x] of the [y][z]
}