import Link from "next/link";
import { Card, Container, Table } from "react-bootstrap";
import Account from "../components/Account";
import Layout from "../components/Layout";
import Vesting from "../components/Vesting";
import { useEagerConnect } from "../hooks/useEagerConnect";
import Header from "./Header";

export default function DAppPage(): JSX.Element {
  // automatically try connecting to the injected connector on pageload
  const triedToEagerConnect = useEagerConnect();
  
  return (
      <Layout title="About | Next.js + TypeScript Example">
        <Header/>
        <Container>
          <Card>
          <Card.Body><h3>Vesting</h3></Card.Body>
          <Card.Body><Account /*triedToEagerConnect={triedToEagerConnect}*/ /></Card.Body>
          <Card.Body><Vesting /></Card.Body>
          </Card>
         
</Container>
</Layout>
  );
}