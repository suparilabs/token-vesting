import Link from "next/link";
import Account from "../components/Account";
import Layout from "../components/Layout";
import { useEagerConnect } from "../hooks/useEagerConnect";

export default function DAppPage(): JSX.Element {
  // automatically try connecting to the injected connector on pageload
  const triedToEagerConnect = useEagerConnect();

  return (
      <Layout title="About | Next.js + TypeScript Example">
        <h1>Vesting Dapp</h1>
        <Account /*triedToEagerConnect={triedToEagerConnect}*/ />
        <p>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </p>
      </Layout>
  );
}