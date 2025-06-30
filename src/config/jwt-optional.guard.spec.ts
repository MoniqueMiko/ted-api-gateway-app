import { ExecutionContext } from '@nestjs/common';
import { JwtOptionalGuard } from './jwt-optional.guard';
import { AuthGuard } from '@nestjs/passport';

describe('JwtOptionalGuard', () => {
    let guard: JwtOptionalGuard | any;

    beforeEach(() => {
        guard = new JwtOptionalGuard();
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

        it('should return null if user is null', () => {
            const result = guard.handleRequest(null, null, 'Invalid token');
            expect(result).toBeNull();
        });

        it('should return null if error exists', () => {
            const error = new Error('Some JWT error');
            const result = guard.handleRequest(error, null, null);
            expect(result).toBeNull();
        });
    });
});
