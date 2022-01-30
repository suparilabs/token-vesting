import Link from "next/link";
import VestingDetails from "./VestingDetails";
import Header from "./Header";
import { Container, TabContainerProps, Button, Card, Table } from "react-bootstrap";


const IndexPage = () => (
  <>
  <Header/>
  <Container>
      <Card>
        <Card.Body>
          <Link href="/vesting">
            <a>Vesting</a>
            </Link>
        </Card.Body>
        <Card.Body>
          <Link href="/privatesale">
            <a>Private Sale</a>
          </Link>
        </Card.Body>
      </Card>
    </Container>   
  </>
);

export default IndexPage;