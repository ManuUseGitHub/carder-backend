export class AddLOVsDTO {
  'fromTo': string[];
  'article': string[];
  'type': string[];
  'themes': string[];
  'parts': string[];
  'chapters': string[];
  'tags': string[];
  'difficulty': string[];
}

export type Characteristics = { [x: string]: string[] };
