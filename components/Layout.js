import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

export default function Layout(props) {
  return (
    <>
      <MainNav />
      <div
        style={{
          backgroundColor: "#121212",
          minHeight: "100vh",
          color: "#e0e0e0",
        }}
      >
        <Container className="py-4">
          {props.children}
        </Container>
      </div>
    </>
  );
}
