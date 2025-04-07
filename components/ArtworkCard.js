import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import Error from 'next/error';

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  );

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card
      className="h-100 border-0 shadow-sm"
      style={{
        backgroundColor: "#1e1e1e",
        color: "#e0e0e0",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 2px #00bcd4";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >



      <Card.Img
        variant="top"
        src={
          data.primaryImageSmall && data.primaryImageSmall !== ""
            ? data.primaryImageSmall
            : "https://via.placeholder.com/375x375.png?text=Image+Unavailable"
        }
        className="rounded-top bg-secondary"
        style={{
          width: "100%",
          height: data.primaryImageSmall ? "auto" : "300px",
          objectFit: data.primaryImageSmall ? "unset" : "contain",
          padding: data.primaryImageSmall ? "0" : "1rem",
          backgroundColor: data.primaryImageSmall ? "transparent" : "#1e1e1e",
        }}
      />




      <Card.Body>
        <Card.Title className="fw-semibold fs-5 text-info">
          {data?.title || "N/A"}
        </Card.Title>
        <Card.Text style={{ fontSize: "0.9rem" }}>
          <strong>Date:</strong> {data.objectDate || "N/A"}
          <br />
          <strong>Classification:</strong> {data.classification || "N/A"}
          <br />
          <strong>Medium:</strong> {data.medium || "N/A"}
        </Card.Text>
        <div className="d-grid gap-2">
          <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
            <Button variant="outline-info" size="sm">
              <strong>ID:</strong> {objectID}
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
