import Link from "next/link";
import { Header } from "@/components/header/Header";

export default function Home() {
  return (
    <div className="py-20">
      <Header
        title="Web3 Developer Course"
        subtitle="Learn how to build web3 applications with the Thirdweb Connect SDK."
      />
      <Menu />
    </div>
  );
}

function Menu() {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center px-10">
      <MenuItem
        title="Home"
        href="/home"
        description="Learn what our In-App Wallets are and how to implement them in your application."
      />
    </div>
  );
}

function MenuItem(props: { title: string; href: string; description: string }) {
  return (
    <Link
      href={props.href}
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2">{props.title}</h2>
        <p className="text-sm text-zinc-400">{props.description}</p>
      </article>
    </Link>
  );
}
