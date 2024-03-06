import { z } from 'zod';

export const loginSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(64, { message: 'Username must be less than 64 characters' })
        .trim(),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(99, { message: 'Password must be less than 99 characters' })
        .trim()
});

export const registerSchema = z.object({
    username: z
        .string({ required_error: 'Username is required' })
        .min(3, { message: 'Username must be at least 3 characters' })
        .max(64, { message: 'Username must be less than 64 characters' })
        .trim(),
    email: z
        .string({ required_error: 'Email is required' })
        .min(1, { message: 'Email is required' })
        .max(64, { message: 'Email must be less than 64 characters' })
        .email({ message: 'Email must be a valid email address' }),
    password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(99, { message: 'Password must be less than 99 characters' })
        .trim(),
    confirmPassword: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(99, { message: 'Password must be less than 99 characters' })
        .trim()
})
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password must match',
                path: ['password']
            });
            ctx.addIssue({
                code: 'custom',
                message: 'Password and Confirm Password must match',
                path: ['confirmPassword']
            });
        }
    });