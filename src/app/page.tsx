import PostcodeLookup from "./components/PostcodeLookup/PostcodeLookup";
import { lookupAddress } from "./providers/postcodes.io/PostcodesIOProvider";

export default function Home() {
  return (
    <PostcodeLookup lookupAddress={lookupAddress} />
  );
}
