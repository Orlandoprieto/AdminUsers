import { useState } from 'react';
import { ZodError } from 'zod';

type ErrorHandler = {
    messageError: string;
    handleError: (err: unknown) => void;
    resetError: () => void;
};

export const useErrorHandler = (): ErrorHandler => {
    const [messageError, setMessageError] = useState<string>('');

    const handleError = (err: unknown) => {
        if (err instanceof ZodError) {
            const errorZod = err as ZodError;
            console.log(errorZod);
            setMessageError(errorZod.errors[0].message);
            return;
        }

        const error = err as Error;
        setMessageError(error.message);
    };

    const resetError = () => {
        setMessageError('');
    };

    return {
        messageError,
        handleError,
        resetError,
    };
};
