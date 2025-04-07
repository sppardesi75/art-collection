import { useAtom } from "jotai";
import { Card, Col, Row, Container } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { favouritesAtom } from "@/store";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <Container
      fluid
      className="py-5 px-4"
      style={{
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#e0e0e0",
      }}
    >
      <h2 className="mb-4 fw-bold text-info">Favourites</h2>
      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objID) => (
            <Col lg={3} key={objID}>
              <ArtworkCard objectID={objID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card
          className="text-light border-0 rounded-4 mt-4"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <Card.Body>
            <h4 className="text-info">Nothing Here</h4>
            <p className="text-muted">Try adding some new artwork to the list.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
