export type HashAlgorithm = 'sha256' | 'crc32';

export interface ISCodeFormatter<EncodedAccess = string> {
  getSchema(): any;
  getSchemaHash(): string;
  validateHash(providedHash: string): void;
  encodeAccess(data: any): { access: EncodedAccess; schemaHash: string };
  parseAccess(access: EncodedAccess): string[];
  hasAccess(key: string, access: EncodedAccess): boolean;
}
