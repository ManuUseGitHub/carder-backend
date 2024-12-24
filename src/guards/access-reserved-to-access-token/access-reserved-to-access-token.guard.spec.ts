import { AccessReservedToAccessTokenGuard } from './access-reserved-to-access-token.guard';

describe('AccessReservedToAccessTokenGuard', () => {
  it('should be defined', () => {
    expect(new AccessReservedToAccessTokenGuard()).toBeDefined();
  });
});
