import Link from "next/link";
import Header from "./Header";
import { Card, Container , Button} from "react-bootstrap";

const IndexPage = () => (

  <>
  <Header/>
  <Container>
    <Card>
      <Card.Body>
      <p>
      <Link href="/vesting">
        <a><h3>Vesting</h3></a>
      </Link>
    </p>
      </Card.Body>
      <Card.Body>
      <p>
      <Link href="/private-sale">
        <a><h3>Private Sale</h3> </a>
      </Link>
    </p>
      </Card.Body>
    </Card>
  </Container>
    
  </>

);

export default IndexPage;