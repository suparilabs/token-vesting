import Link from "next/link";
import Header from "./Header";

const IndexPage = () => (
  <>
  <Header/>
    <p>
      <Link href="/vesting">
        <a>Vesting</a>
      </Link>
    </p>
  </>

);

export default IndexPage;