import { useAtom } from "jotai";
import { Button, Card, ListGroup, Container } from "react-bootstrap";
import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory) return null;

  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

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
      <h2 className="mb-4 fw-bold text-info">Search History</h2>

      {parsedHistory.length > 0 ? (
        <ListGroup variant="flush">
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              onClick={(e) => historyClicked(e, index)}
              style={{
                backgroundColor: "#1e1e1e",
                color: "#e0e0e0",
                borderBottom: "1px solid #333",
                cursor: "pointer",
              }}
              className="rounded-0"
            >
              {Object.keys(historyItem).map((key, i) => (
                <span key={i}>
                  <span className="text-info">{key}</span>:{" "}
                  <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="outline-info"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card
          className="text-light border-0 rounded-4 mt-4"
          style={{ backgroundColor: "#1e1e1e" }}
        >
          <Card.Body>
            <h4 className="text-info">Nothing Here</h4>
            <p className="text-muted">Try searching for some artwork.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
