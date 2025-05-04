import { Response } from 'express';
export declare class FilesController {
    private readonly baseUploadDir;
    listFilesInFolder(folder: string): Promise<{
        name: string;
        url: string;
    }[]>;
    getFile(folder: string, filename: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
