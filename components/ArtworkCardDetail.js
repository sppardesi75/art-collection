import { Button, Card } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const favouritesClicked = async () => {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
    } else {
      setFavouritesList(await addToFavourites(objectID));
    }
  };

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList, objectID]);

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  return (
    <Card
      className="shadow-sm border-0 text-light"
      style={{
        backgroundColor: "#1e1e1e",
        padding: "1.25rem",
        borderRadius: "1rem",
      }}
    >
      {data.primaryImage && (
        <Card.Img
          variant="top"
          src={data.primaryImage}
          className="rounded-top mb-3"
          style={{ width: "100%", height: "auto" }}
        />
      )}
      <Card.Body>
        <Card.Title className="fs-4 fw-bold text-info">
          {data.title || "N/A"}
        </Card.Title>
        <Card.Text style={{ fontSize: "0.9rem" }}>
          <strong>Date:</strong> {data.objectDate || "N/A"}<br />
          <strong>Classification:</strong> {data.classification || "N/A"}<br />
          <strong>Medium:</strong> {data.medium || "N/A"}<br /><br />
          <strong>Artist:</strong> {data.artistDisplayName || "N/A"}{" "}
          {data.artistWikidata_URL && (
            <>
              (
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
                className="text-info text-decoration-none"
              >
                wiki
              </a>
              )
            </>
          )}<br />
          <strong>Credit Line:</strong> {data.creditLine || "N/A"}<br />
          <strong>Dimensions:</strong> {data.dimensions || "N/A"}<br /><br />
          <Button
            variant={showAdded ? "primary" : "outline-info"}
            onClick={favouritesClicked}
          >
            + Favourite {showAdded && "( added )"}
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
