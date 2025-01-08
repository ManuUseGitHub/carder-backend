export const getNewEntries = (
  sortedArray1: string[],
  sortedArray2: string[],
) => {
  const newEntries = [];
  let i = 0,
    j = 0;

  // Traverse both arrays
  while (i < sortedArray1.length && j < sortedArray2.length) {
    if (sortedArray1[i] === sortedArray2[j]) {
      // Match found, move both pointers
      i++;
      j++;
    } else if (sortedArray1[i] < sortedArray2[j]) {
      // Entry in sortedArray1 is not in sortedArray2
      newEntries.push(sortedArray1[i]);
      i++;
    } else {
      // Entry in sortedArray2 is not in sortedArray1, move pointer in sortedArray2
      j++;
    }
  }

  // Add remaining entries from sortedArray1
  while (i < sortedArray1.length) {
    newEntries.push(sortedArray1[i]);
    i++;
  }

  return newEntries;
};
