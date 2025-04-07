import { Col, Row, Container } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <Container
      fluid
      className="py-5 px-4"
      style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0" }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </Container>
  );
}
