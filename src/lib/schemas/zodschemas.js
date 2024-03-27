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

    export const questionSchema = z.object({
        question: z
            .string({ required_error: 'Question is required' })
            .min(3, { message: 'Question must be at least 3 characters' })
            .max(64, { message: 'Question must be less than 64 characters' })
            .trim(),
        answer1: z
            .string({ required_error: 'Answer1 is required' })
            .min(3, { message: 'Answer1 must be at least 3 characters' })
            .max(99, { message: 'Answer1 must be less than 99 characters' })
            .trim(),
        answer2: z
            .string({ required_error: 'Answer2 is required' })
            .min(3, { message: 'Answer2 must be at least 3 characters' })
            .max(99, { message: 'Answer2 must be less than 99 characters' })
            .trim(),
        answer3: z
            .string({ required_error: 'Answer3 is required' })
            .min(3, { message: 'Answer3 must be at least 3 characters' })
            .max(99, { message: 'Answer3 must be less than 99 characters' })
            .trim(),
        answer4: z
            .string({ required_error: 'Answer1 is required' })
            .min(3, { message: 'Answer2 must be at least 3 characters' })
            .max(99, { message: 'Answer3 must be less than 99 characters' })
            .trim(),
        answer4: z
            .string({ required_error: 'Answer4 is required' })
            .min(3, { message: 'Answer4 must be at least 3 characters' })
            .max(99, { message: 'Answer4 must be less than 99 characters' })
            .trim(),
        correctAnswer: z
            .string({ required_error: 'Correct Answer is required' })
            .min(3, { message: 'Correct Answer must be at least 3 characters' })
            .max(99, { message: 'Correct Answer must be less than 99 characters' })
            .trim(),
        category_id: z
            .number({ required_error: 'Category Id is required' })
            .min(1, { message: 'Category Id must be at least 1' })
            .max(10, { message: 'Category Id must be less than 11' })
    })
    .superRefine(({ answer1, answer2, answer3, answer4, correctAnswer }, ctx) => {
        const answers = [answer1, answer2, answer3, answer4];
        if (!answers.some(answer => answer === correctAnswer)) {
            ctx.addIssue({
                code: 'custom',
                message: 'At least one answer must match the correct answer',
                path: ['correctAnswer']
            });
        }
    });