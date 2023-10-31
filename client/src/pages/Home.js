import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DeliverCard from "../components/DeliverCard";
import DeliveryProgressCard from "../components/DeliveryProgressCard";
import MonthlyInsightsCard from "../components/MonthlyInsightsCard";
import ExpenseCard from "../components/ExpenseCard";
import IncomeExpCard from "../components/IncomeExpCard";
import IncomeProgressCard from "../components/IncomeProgressCard";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import { useSidebar } from "../context/SidebarContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Home = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const [show, setShow] = useState(false);
  const [vendorLink, setVendorLink] = useState("");
  const [linkStatus, setLinkStatus] = useState(""); // New state to store link status

  const closeModal = () => {
    setShow(false);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    // Function to check the link status in Firebase
    const checkLinkStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/fetch-link'); // Define an API endpoint to fetch the link status
        const data = await response.json();

        console.log(data.linkStatus)

        if (data.linkStatus === "expired" || data.linkStatus === "not_found") {
          // Set the link status to determine whether to show the modal
          setLinkStatus(data.linkStatus);

          // Open the modal when the link is expired or not found
          setShow(true);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    checkLinkStatus();
  }, []);

  const handleUpload = async () => {
    try {
      const response = await fetch('http://localhost:3000/store-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: vendorLink }),
      });

      console.log('Response:', response);

      if (response.status === 200) {
        console.log('Vendor Link was stored successfully.');
      } else if (response.status === 400) {
        console.error('The Vendor Link is not working.');
      } else {
        console.error('Error occurred while storing the Vendor Link.');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setShow(false);
  };

  return (
    <div className="body-wrapper">
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Provide the Latest Vendor link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="vendorLink">Vendor Link</Form.Label>
          <Form.Control
            type="text"
            id="vendorLink"
            aria-describedby="HelpBlock"
            value={vendorLink}
            onChange={(e) => setVendorLink(e.target.value)}
          />
          <Form.Text id="HelpBlock" muted>
            {linkStatus === "expired" ? (
              <span className="text-danger">The Vendor Link was expired!</span>
            ) : (
              <span>Please type the latest vendor link in the above input field.</span>
            )}
          </Form.Text>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="success" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar toggleSidebar={toggleSidebar} />
      <Container fluid>
        <Row>
          <Col lg={4}>
            <DeliverCard />
          </Col>
          <Col lg={4}>
            <IncomeProgressCard />
          </Col>
          <Col lg={4}>
            <ExpenseCard />
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <IncomeExpCard />
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            <DeliveryProgressCard />
          </Col>
          <Col lg={6}>
            <MonthlyInsightsCard />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;
