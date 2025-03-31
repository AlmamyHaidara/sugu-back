import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class FilesService {
  private readonly uploadDir = join(__dirname, '..', 'uploads');

  async validateFileAccess(filename: string): Promise<string> {
    // Ajoutez ici votre logique de validation
    return join(this.uploadDir, filename);
  }
}
