import { Card, Form, Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function Register(props) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await registerUser(user, password, password2);
      router.push("/login");
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <Container
      className="py-5"
      style={{ maxWidth: "500px", color: "#e0e0e0", backgroundColor: "#121212" }}
    >
      <Card className="bg-dark text-light border-0 rounded-4 shadow-sm">
        <Card.Body>
          <h2 className="text-info mb-3">Register</h2>
          <p className="text-muted">Register for an account:</p>
        </Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            className="bg-dark text-light border-secondary"
            onChange={(e) => setUser(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            className="bg-dark text-light border-secondary"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            className="bg-dark text-light border-secondary"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>
        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}
        <br />
        <Button variant="outline-info" className="float-end" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
}
