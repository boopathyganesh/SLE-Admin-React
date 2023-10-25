import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/globals.css';

export default function Orders() {
  const [data, setData] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Fetch data from your API
    fetch('http://localhost:3000/api/fetch-data') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Convert the object to an array of objects
        const dataArray = Object.keys(data).map((key) => ({
          key,
          ...data[key],
        }));
        setData(dataArray); // Set the fetched data to the state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="body-wrapper">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-semibold mb-4 text-voilet">
                  SLE Orders Management
                </h5>
                <div className="table-responsive">
                  <table className="table text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                      <tr className="text-center">
                      <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">PO_Ref</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Item</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Drawing</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Qty Ordered</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Current_cost</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Material Supplier</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Material Available</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Notes</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={index}>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['PO Ref']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <a href="#" className="fw-semibold mb-0" onClick={() => handleModalOpen(row)}>
                              {row['Item']}
                            </a>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Drawing']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Qty Ordered']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Current_cost']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Material Supplier']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Material Available']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Notes']}</p>
                          </td>
                          {/* Add other table cells here */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <>
              <p>Item: {selectedItem['Item']}</p>
              <div className="form-group mt-4">
              <label htmlFor="DeliveryStatus">Delivery Status</label>
              <select
                id="DeliveryStatus"
                className="form-control mt-4"
                value={selectedItem['DeliveryStatus']}
              >
                <option value="option1">Delivered</option>
                <option value="option2">In Transit</option>
                <option value="option3">Not yet Initiated</option>
              </select>
            </div>
              {/* Add more fields as needed */}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
