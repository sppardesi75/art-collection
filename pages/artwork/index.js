import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState();
  const router = useRouter();
  const [page, setPage] = useState(1);

  let finalQuery = router.asPath.split('?')[1];
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  function nextPage() {
    if (page < artworkList.length) setPage((p) => p + 1);
  }

  function previousPage() {
    if (page > 1) setPage((p) => p - 1);
  }

  useEffect(() => {
    if (data) {
      let filteredResults = validObjectIDList.objectIDs.filter((x) => data.objectIDs?.includes(x));
      const results = [];

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) return <Error statusCode={404} />;
  if (!artworkList) return null;

  return (
    <Container
      fluid
      className="py-5 px-4"
      style={{ backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0" }}
    >
      {artworkList.length > 0 ? (
        <>
          <Row className="gy-4">
            {artworkList[page - 1]?.map((objID) => (
              <Col lg={3} key={objID}>
                <ArtworkCard objectID={objID} />
              </Col>
            ))}
          </Row>

          <Row className="mt-4">
            <Col className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        <Card className="text-light bg-dark border-0 rounded-4 mt-4">
          <Card.Body>
            <h4 className="text-info">Nothing Here</h4>
            <p className="text-muted">Try searching for something else.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
