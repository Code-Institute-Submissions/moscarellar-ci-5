import React from "react";
import styles from "../../styles/Home.module.css";


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

function Home() {
  return (
    <Container fluid>
      <Row className={styles.Row}>
        <Card className={styles.Card}>
          <Card.Body>
            <Card.Title className={styles.CardTitle}>Share Your Favorite Memes</Card.Title>
            <Card.Text className={styles.CardText}>
              Upload and share the funniest memes you've found or created. Let's spread laughter together!
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row className={styles.Row}>
        <Card className={styles.Card}>
          <Card.Body>
            <Card.Title className={styles.CardTitle}>Discover and Laugh!</Card.Title>
            <Card.Text className={styles.CardText}>
              Explore memes from our community. Discover new memes, vote for your favorites, and have a good laugh!
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row className={styles.Row}>
        <Card className={styles.Card}>
          <Card.Body>
            <Card.Title className={styles.CardTitle}>Manage Your Todo List!</Card.Title>
            <Card.Text className={styles.CardText}>
              Stay organized and productive with our integrated todo list. Keep track of your tasks and get things done!
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default Home;
