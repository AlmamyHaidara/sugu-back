import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { promises as fs } from 'fs';
import { join, resolve } from 'path';
import { Public } from 'src/auth/constants';

@Controller('files')
export class FilesController {
  private readonly baseUploadDir = join(__dirname, '..', 'uploads');

  @Get(':folder')
  @Public()
  async listFilesInFolder(@Param('folder') folder: string) {
    try {
      const targetDir = resolve(this.baseUploadDir, folder);

      // Sécurité : vérifier que le chemin reste bien dans "uploads"
      if (!targetDir.startsWith(this.baseUploadDir)) {
        return [];
      }

      const files = await fs.readdir(targetDir);
      return files.map((file) => ({
        name: file,
        url: `/files/${folder}/${file}`,
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  @Get(':folder/:filename')
  @Public()
  async getFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = resolve(this.baseUploadDir, folder, filename);
    // Sécurité : on vérifie bien que le fichier est dans le dossier "uploads"
    if (!filePath.startsWith(this.baseUploadDir)) {
      return res.status(400).send('Invalid path');
    }

    res.sendFile(filePath, {}, (err) => {
      if (err) {
        console.error(err);
        res.status(404).send('File not found');
      }
    });
  }
}
