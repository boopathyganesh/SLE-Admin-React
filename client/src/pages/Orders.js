import React, { useEffect, useState } from 'react';
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
  const [selectedPoRef, setSelectedPoRef] = useState('');
  const [selectedDueDate, setSelectedDueDate] = useState('');
  const [selectedPromisedDate, setSelectedPromisedDate] = useState('');

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/fetch-data')
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

  const poRefs = Object.keys(data);

  const handlePoRefSelect = (selectedValue) => {
    setSelectedPoRef(selectedValue);
  };

  const filterData = () => {
    if (!selectedPoRef) {
      // If no PO Ref is selected, filter data based on selectedDueDate and selectedPromisedDate
      return data[selectedDueDate + selectedPromisedDate] || {};
    }

    // If a PO Ref is selected, filter data based on the selected PO Ref
    return data[selectedPoRef] || {};
  };

  const filteredDetails = filterData();


  const handleUpdateDeliveryStatus = () => {
    if (selectedItem) {
      const { DeliveryStatus, 'PO Ref': poRef } = selectedItem;
      console.log(DeliveryStatus)

  
      // Create an object to send in the request
      const updateData = {
        poRef,
        deliveryStatus: DeliveryStatus,
        selectedPoRef:selectedPoRef
      };
  
      // Make an HTTP POST request to update the Delivery Status
      fetch('http://localhost:3000/updateDeliveryStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData), // Send the updateData object
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message); // Log the success message
          // You can also update the local state if needed
        })
        .catch((error) => {
          console.error('Error updating Delivery Status:', error);
          // Log the error for debugging
        });
    }
  };
  

  return (
    <div className="body-wrapper">
      <Navbar />
      <div className="container-fluid">
        <h5 className="card-title fw-semibold mb-4 text-voilet text-center">SLE Order Management</h5>
        <div className="row">
          <div className="form-group mt-3 col-md-4">
            <label htmlFor="poRefDropdown" className="select text-danger mb-3">
              Select PO Ref:
            </label>
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
        </div>
        <div className="table-responsive mt-9">
          <table className="table text-nowrap mb-0 align-middle">
            <thead className="text-center fs-4">
              <tr>
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
                  <h6 className="fw-semibold mb-0">Due Date</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Promised Date</h6>
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
              </tr>
            </thead>
            <tbody>
              {Object.keys(filteredDetails).map((poRef, index) => {
                const row = filteredDetails[poRef];
                return (
                  <tr key={index}>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">{poRef}</p>
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
                      <p className="mb-0 fw-normal">{row['Current_cost']}</p>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">{row['Due Date']}</p>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">{row['Promised Date']}</p>
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
                  </tr>
                );
              })}
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
                  onChange={(e) => {
                    const updatedItem = { ...selectedItem, DeliveryStatus: e.target.value };
                    setSelectedItem(updatedItem);
                  }}
                >
                  <option value="">-- Select Status --</option>
                  <option value="Delivered">Delivered</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Not yet Initiated">Not yet Initiated</option>
                </select>
              </div>
              {/* Add more fields as needed */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateDeliveryStatus}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
