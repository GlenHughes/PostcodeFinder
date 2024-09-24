export interface IPostcodeProvider {
    lookupAddress(address: string): Promise<string[]>;
  }