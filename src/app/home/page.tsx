"use client";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { inAppWallet } from "thirdweb/wallets";
import Navbar from "@/components/navbar/Navbar";
import HomeSection from "@/components/home/HomeSection";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/cta/Banner";
import Marquee from "@/components/marquee/Marquee";
import FAQ from "@/components/faq/FAQ";

const InAppWalletsPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HomeSection />
      <Marquee />
      <FAQ />
      <Banner />
      <Footer />
      <InAppWalletOptions />
    </div>
  );
};

function InAppWalletOptions() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      {/* <AllOptions /> */}
    </div>
  );
}

// Default In-App Wallet options (all options)
function AllOptions() {
  return (
    <div className="flex flex-col items-center mb-20 md:mb-20">
      <p className="text-zinc-300 text-base mb-4 md:mb-4">All Options</p>
      <ConnectButton client={client} wallets={[inAppWallet()]} />
    </div>
  );
}

export default InAppWalletsPage;
