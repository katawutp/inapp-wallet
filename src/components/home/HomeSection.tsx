import { client } from "@/app/client";
import { contract } from "@/app/utils/contractCalls";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { sepolia } from "thirdweb/chains";
import { claimTo } from "thirdweb/extensions/erc721";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
  ClaimButton,
  TransactionButton,
} from "thirdweb/react";

// import Marquee from "./Marquee";

const HomeSection = () => {
  const { data: token } = useReadContract({
    contract,
    method: "function nextTokenIdToClaim() view returns (uint256)",
    params: [],
  });

  const { mutate: sendTransaction } = useSendTransaction();
  const account = useActiveAccount();

  return (
    console.log(token, contract),
    (
      <section className="mx-auto md:px-8 lg:px-4 py-2 h-screen full-home-bg overflow-hidden flex justify-between items-center md:gap-10">
        <div className="flex flex-col justify-center items-center m-auto bg-card rounded-lg shadow-lg overflow-hidden bg-[#1c1c24]">
          <div className="p-4 rounded-xl flex items-center justify-center">
            <Image
              src="https://soccer-cards.b-cdn.net/Players/1580303194.png"
              alt="Spicy Chicken NFT"
              className="w-full h-full object-contain rounded-xl"
              width={350}
              height={350}
            />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-foreground">
              CLAIM YOUR FIRST SOCCER CARD PLAYER
            </h2>
            <div className="flex items-center mt-4">
              <span className="text-lg font-semibold">Quantity:</span>

              <span className="mx-2">1</span>
            </div>
            <div className="mt-4">
              <span className="text-lg font-bold">
                Price:{" "}
                <strong className="text-2xl text-pink-light animate-pulse">
                  FREE
                </strong>
              </span>
            </div>
            <TransactionButton
              unstyled
              className="bg-gradient-to-r from-pink-light via-pink-medium to-pink-dark text-blue-dark text-2xl font-bold rounded-lg w-full mt-4 py-2"
              transaction={() =>
                claimTo({
                  contract,
                  to: account?.address,
                  amount: 1n as bigint,
                })
              }
              onError={(err) => {
                console.log("Contract:", contract);
                console.log("Account Address:", account?.address);
                console.log("Amount:", 1n);
                // Add your own logic here
              }}
              payModal={{
                // This image & title will show up in the Pay modal
                metadata: {
                  name: "Van Gogh Starry Night",
                  image: "https://unsplash.com/starry-night.png",
                },
              }}
              onTransactionSent={(tx) => {
                alert("transaction sent!");
                console.log("Contract:", contract);
                console.log("Account Address:", account?.address);
                console.log("Amount:", 1n);
                // Add your own logic here. For example, a toast
              }}
              onTransactionConfirmed={(tx) => {
                alert("transaction sent!");
                console.log(tx);
                // Add your own logic here. For example, a toast
              }}
            >
              Claim now
            </TransactionButton>
          </div>
        </div>

        <div className="flex flex-col justify-center md:items-center lg:items-end">
          <div className="relative flex justify-center h-screen z-1 mr-20">
            <div className="flex flex-col justify-center w-full mb-16 text-white">
              <h1 className="font-extrabold leading-[56px] tracking-[2px] text-7xl">
                SOCCER CARDS
              </h1>
              <div className="flex gap-3 font-semibold mt-4 tracking-[2px] text-5xl ">
                <h1>Made by</h1>
                <h1 className="text-[rgba(0,0,0,0)] bg-clip-text bg-gradient-to-r from-pink-dark to-pink-medium">
                  IA.
                </h1>
              </div>
              <p className="text-slate-300 font-dm-sans font-bold leading-6 text-m max-w-lg mt-8">
                Collect, trade, and compete in this thrilling virtual universe,
                where each card represents a piece of football history.
              </p>
              {/* <p className="text-grey font-dm-sans font-bold leading-6 text-m max-w-md mb-8">
              Join now and be part of this unparalleled experience.
            </p> */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8">
                <Link
                  href="/show-posts"
                  className="font-dm-sans font-bold bg-gradient-to-r from-pink-light via-pink-medium to-pink-dark text-blue-dark px-10 py-4 rounded-md border-[#060047] border hover:border-pink-light hover:text-black hover:shadow-lg hover:shadow-blue-dark "
                >
                  Explore
                </Link>
                <div className="flex space-x-10 font-Organo m-auto items-center">
                  <div className="text-center">
                    <p className="font-semibold">50k+</p>
                    <p className="text-sm">Players</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">20+</p>
                    <p className="text-sm">Teams</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">100+</p>
                    <p className="text-sm">Jerseys</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Marquee /> */}
        </div>
      </section>
    )
  );
};

export default HomeSection;
