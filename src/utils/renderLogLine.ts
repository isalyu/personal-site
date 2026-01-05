const TAG_WIDTH = 10;

export function formatTag(tag: string) {
  return `[${tag}]`.padEnd(TAG_WIDTH, " ");
}
