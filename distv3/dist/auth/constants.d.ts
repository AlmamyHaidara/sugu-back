export declare const jwtConstants: {
    secret: string;
};
export declare const IS_PUBLIC_KEY = "published";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export type PasswordUpdate = {
    userId: number;
    newPassword: string;
    currentPassword: string;
};
