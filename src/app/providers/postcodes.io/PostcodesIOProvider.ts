"use server";

type PostcodesIOResult = {
    postcode: string,
    key: string
}

export async function lookupAddress(address: string): Promise<string[]> {
    const response = await fetch(`https://api.postcodes.io/postcodes?q=${encodeURIComponent(address)}`);
    const data = await response.json();
    if (data.status === 200) {
        return !data.result ? [] : data.result.map((item: PostcodesIOResult) => item.postcode);
    } else {
      throw new Error('Failed to fetch postcodes');
    }
  }