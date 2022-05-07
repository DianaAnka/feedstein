import * as bcrybt from 'bcryptjs';

export async function hashString(rawString: string): Promise<string> {
  const salt = await bcrybt.genSalt(12);
  const hash = await bcrybt.hash(rawString, salt);
  return hash;
}