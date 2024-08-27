"use client";
import { client } from "@/app/client";
import Image from "next/image";
import Link from "next/link";
import {
  ConnectButton,
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

import logo from "@public/scialogo.png";
import { useEffect, useState } from "react";
import { checkOrCreateUser, getUserTeamByEmail } from "@/app/utils/dbCalls";
import { getUserEmail } from "thirdweb/wallets/embedded";
import { defineChain, getContract } from "thirdweb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const account = useActiveAccount();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const getEmail = async () => {
      const email = await getUserEmail({ client });
      if (account && account.address && email) {
        checkOrCreateUser(email, account.address);
        const hasTeam = await getUserTeamByEmail(email);
        console.log(hasTeam);
        setTeam(hasTeam);
      }
    };
    getEmail();
  }, [account?.address]);

  return (
    <nav className="bg-[#1c1c24] text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-10">
        <div className="flex items-center">
          <Link href="/">
            <Image src={logo} width={50} height={50} alt="logo" />
          </Link>
          <span className="text-primary text-xl font-bold">SOCCER CARDS</span>
        </div>

        <div className="flex items-center space-x-8 ml-10">
          <a href="#" className="text-muted hover:text-muted-foreground">
            Marketplace
          </a>
          <a href="#" className="text-muted hover:text-muted-foreground">
            Activity
          </a>
          <a href="#" className="text-muted hover:text-muted-foreground">
            About
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-4">
        {/* <input
          type="text"
          placeholder="Search"
          className="border border-border rounded-lg p-2 bg-input text-foreground"
        /> */}
        {team ? (
          <div>
            <Avatar>
              <AvatarImage src={team?.image} alt="@shadcn" />
              <AvatarFallback>Tm</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <Link href="/choose-club">
            <button className="text-black hover:opacity-80 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-light via-pink-medium to-pink-dark font-semibold">
              Create your team
            </button>
          </Link>
        )}

        <ConnectButton client={client} wallets={[inAppWallet()]} />
      </div>
    </nav>
  );
}
