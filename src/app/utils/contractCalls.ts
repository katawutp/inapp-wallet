import { defineChain, getContract } from "thirdweb";
import { client } from "@/app/client";
import { useReadContract } from "thirdweb/react";

export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0x7A9D38a89C4fC4Bb09b8280855d25964DEE82445",
});
