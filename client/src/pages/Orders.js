import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/globals.css';

export default function Orders() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedPoRef, setSelectedPoRef] = useState(null);

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    // Fetch data from your server
    fetch('http://localhost:3000/api/fetch-data') // Replace with your server URL
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const poRefs = Object.keys(data); // Get the list of 'PO Ref' values

  // Handle when a 'PO Ref' is selected from the dropdown
  const handlePoRefSelect = (selectedValue) => {
    setSelectedPoRef(selectedValue);
  };

  // Filter and map the details based on the selected 'PO Ref'
  const filteredDetails = selectedPoRef ? data[selectedPoRef] : [];

  return (
    <div className="body-wrapper">
      <Navbar />
      <div className="container-fluid">
      <h5 className="card-title fw-semibold mb-4 text-voilet text-center">SLE Order Management</h5>
        {/* Dropdown for selecting 'PO Ref' */}
        <div className="form-group mt-3">
          <label htmlFor="poRefDropdown" class="select text-danger mb-3">Select PO Ref:</label>
          <select
            id="poRefDropdown"
            className="form-control"
            value={selectedPoRef}
            onChange={(e) => handlePoRefSelect(e.target.value)}
          >
            <option value="">-- Select a PO Ref --</option>
            {poRefs.map((poRef) => (
              <option key={poRef} value={poRef}>
                {poRef}
              </option>
            ))}
          </select>
        </div>

        {/* Table for displaying details based on the selected 'PO Ref' */}
        <div className="table-responsive">
          <table className="table text-nowrap mb-0 align-middle">
            {/* Table headers here */}
            <thead className="text-center fs-4">
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">PO Ref</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Component</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Drawing</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Item Rev</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Buyer</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Qty Ordered</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Current_cost</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Due Date/Promised Date</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">DeliveryStatus</h6>
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
            </thead>
            <tbody>
              {filteredDetails.map((row, index) => (
                <tr key={index}>
                  <td className="border-bottom-0">
                    <p className="mb-0 fw-normal">{row['PO Ref']}</p>
                  </td>
                  <td className="border-bottom-0">
                    <a className="fw-semibold mb-0" onClick={() => handleModalOpen(row)}>
                      {row['Item']}
                    </a>
                  </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Drawing']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Item Rev']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Buyer']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Qty Ordered']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['CurrentCost']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Due DatePromised Date']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['DeliveryStatus']}</p>
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
                  {/* Render other details here */}
                </tr>
              ))}
            </tbody>
          </table>
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
