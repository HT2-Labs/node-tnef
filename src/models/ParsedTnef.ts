export default interface ParsedTnef {
  readonly level: number;
  readonly name: number;
  readonly type: number;
  readonly data: string[];
  readonly length: number;
}
