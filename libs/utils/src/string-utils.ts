import * as bcrybt from 'bcryptjs';
import * as uuid from 'uuid';

export async function hashString(rawString: string): Promise<string> {
  const salt = await bcrybt.genSalt(12);
  const hash = await bcrybt.hash(rawString, salt);
  return hash;
}

export function getRandomString() {
  return uuid.v4();
}

export function compareHashingStrings(string1: string, string2: string) {
  return bcrybt.compare(string1, string2);
}
