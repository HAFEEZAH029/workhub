export type ActionResponse<T = void> = {
    data?: T;
    success: boolean;
    errors?: Record<string, string[]>;
    message?: string;

};