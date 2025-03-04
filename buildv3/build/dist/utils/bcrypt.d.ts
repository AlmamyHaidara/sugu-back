export declare const hash: (password: string) => Promise<string>;
export declare const compare: (password: string, hash: string) => Promise<boolean>;
