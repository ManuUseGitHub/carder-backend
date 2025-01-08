import { makeAlias } from './aliasHelper';
import { API_VERSION_ID } from './constents';
import * as myModule from './hexHelper';

describe('routes', () => {
  jest.mock('./aliasHelper', () => ({
    ...jest.requireActual('./aliasHelper'),
    makeAlias: jest.fn(),
  }));

  it('is possible to alias route with segment', () => {
    const mock = jest.spyOn(myModule, 'hexToUtf8'); // spy on otherFn
    mock.mockReturnValue('api/VX'); // mock the return value

    expect(makeAlias(API_VERSION_ID, 'test')).toStrictEqual([
      API_VERSION_ID + '/test',
      'api/VX/test',
    ]);
  });
});
