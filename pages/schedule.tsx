import Link from "next/link";
import Vesting from '../components/Vesting';
import Layout from "../components/Layout";
import { useEagerConnect } from "../hooks/useEagerConnect";

export default function DAppPage(): JSX.Element {
  // automatically try connecting to the injected connector on pageload
  const triedToEagerConnect = useEagerConnect();
  return (
      <Layout title="About | Next.js + TypeScript Example">
        <h1>Vesting Schedule</h1>
        <Vesting /*triedToEagerConnect={triedToEagerConnect}*/ />
        <h3>Get Vesting Schedule</h3>
        <label></label>
        <p>
          <Link href="/">
            <a>Go home</a>
          </Link>
        </p>
      </Layout>
  );
}