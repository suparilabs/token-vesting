import { Card, Container } from "react-bootstrap";
import Account from "../components/Account";
import Layout from "../components/Layout";
import Vesting from "../components/Vesting";
import Header from "./Header";

export default function DAppPage(): JSX.Element {
  // automatically try connecting to the injected connector on pageload
  
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