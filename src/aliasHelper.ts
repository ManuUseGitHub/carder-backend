import { hexToUtf8 } from './hexHelper';

export const makeAlias = (b64: string, segment: string) =>
  [`${b64}`, `${hexToUtf8(b64)}`].map((x) => x + '/' + segment);
