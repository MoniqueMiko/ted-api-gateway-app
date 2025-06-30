import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtGuard } from './jwt-guard.guard';
import { AuthGuard } from '@nestjs/passport';

describe('JwtGuard', () => {
  let guard: JwtGuard;

  beforeEach(() => {
    guard = new JwtGuard();
  });

  describe('canActivate', () => {
    it('should call super.canActivate', () => {
      const context = {} as ExecutionContext;
      const superSpy = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate').mockReturnValue(true as any);

      const result = guard.canActivate(context);
      expect(result).toBe(true);
      superSpy.mockRestore();
    });
  });

  describe('handleRequest', () => {
    it('should return the user if no error exists', () => {
      const user = { id: '123', email: 'user@test.com' };
      const result = guard.handleRequest(null, user, null);
      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if user is null', () => {
      expect(() => guard.handleRequest(null, null, 'Invalid token')).toThrow(UnauthorizedException);
    });

    it('should throw the original error if err exists', () => {
      const customError = new Error('Something went wrong');
      expect(() => guard.handleRequest(customError, null, null)).toThrow(customError);
    });
  });
});