import { JwtStrategy } from './jwt.strategy';
import { ExtractJwt } from 'passport-jwt';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, JWT_SECRET: 'test-secret' };
    strategy = new JwtStrategy();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should extract token from Authorization header', () => {
    const extractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const token = extractor({ headers: { authorization: 'Bearer token123' } } as any);
    expect(token).toBe('token123');
  });

  it('validate should return the payload correctly', async () => {
    const mockPayload = { sub: 'user123', email: 'user@test.com' };
    const result = await strategy.validate(mockPayload);
    expect(result).toEqual(mockPayload);
  });
});