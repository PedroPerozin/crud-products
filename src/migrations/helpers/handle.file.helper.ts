import { readFileSync } from 'fs';

export class FileHelper {
  static read(filePath: string): string {
    return readFileSync(filePath, 'utf-8');
  }
}
