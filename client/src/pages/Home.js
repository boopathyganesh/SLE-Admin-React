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

  // Function to close the modal
  const closeModal = () => {
    setShow(false);
  };

  // Add additional logic for verification
  const handleVerification = () => {
    // Add your verification logic here

    // If verification is successful, close the modal
    closeModal();
  };

  // Open the modal when the page loads
  useEffect(() => {
    // You can add your own logic for when to open the modal
    // For now, it will open immediately after 1 second
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  const handleClose = () => setShow(false);

  return (
    <div className="body-wrapper">
      {/* Modal */}
      {/* <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal Title</h5>
              <button type="button" className="btn-close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <label htmlFor="textInput">Label:</label>
              <input type="text" id="textInput" className="form-control" />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div> */}
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
          />
          <Form.Text id="HelpBlock" muted>
            <span className="text-danger">The Vendor Link was expired!</span><br />
             Please type the latest vendor link on the above input field.
          </Form.Text>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="success" onClick={handleClose}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal */}
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
