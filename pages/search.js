import { Col, Row, Button, Form, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";

export default function AdvancedSearch() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function submitForm(data) {
    let queryString = `${data.searchBy}=true`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?${queryString}`);
  }

  return (
    <Container
      className="py-5"
      style={{ backgroundColor: "#121212", color: "#e0e0e0" }}
    >
      <h2 className="text-info mb-4">Advanced Search</h2>
      <Form onSubmit={handleSubmit(submitForm)}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control
                className={`bg-dark text-light border-secondary ${
                  errors.q ? "is-invalid" : ""
                }`}
                type="text"
                placeholder=""
                {...register("q", { required: true })}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Search By</Form.Label>
              <Form.Select
                {...register("searchBy")}
                className="bg-dark text-light border-secondary"
              >
                <option value="title">Title</option>
                <option value="tags">Tags</option>
                <option value="artistOrCulture">Artist or Culture</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="bg-dark text-light border-secondary"
                {...register("geoLocation")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g., &quot;Europe&quot;, &quot;Paris&quot;, &quot;China&quot;), use | to separate
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className="bg-dark text-light border-secondary"
                {...register("medium")}
              />
              <Form.Text className="text-muted">
                Case Sensitive String (e.g., &quot;Paintings&quot;, &quot;Sculpture&quot;), use | to separate
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              className="text-light"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              className="text-light"
              {...register("isOnView")}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <br />
            <Button variant="outline-info" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
