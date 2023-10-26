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

  return (
    <div className="body-wrapper">
      <Navbar />
      <div className="container-fluid">
        {Object.keys(data).map((poRef, poRefIndex) => (
          <div key={poRefIndex}>
            <h6>PO Ref: {poRef}</h6>
            <div className="table-responsive">
              <table className="table text-nowrap mb-0 align-middle">
                <thead className="text-dark fs-4">
                  <tr className="text-center">
                    <th className="border-bottom-0">
                      <h6 className="fw-semibold mb-0">PO Ref</h6>
                    </th>
                    <th className="border-bottom-0">
                      <h6 className="fw-semibold mb-0">Item</h6>
                    </th>
                    <th className="border-bottom-0">
                      <h6 className="fw-semibold mb-0">Drawing</h6>
                    </th>
                    {/* Add other table headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {data[poRef].map((row, index) => (
                    <tr key={index}>
                      <td className="border-bottom-0">
                        <p className="mb-0 fw-normal">{row['PO Ref']}</p>
                      </td>

                      <td className="border-bottom-0">
                        <a
                          href="#"
                          className="fw-semibold mb-0"
                          onClick={() => handleModalOpen(row)}
                        >
                          {row['Item']}
                        </a>
                      </td>
                      <td className="border-bottom-0">
                        <p className="mb-0 fw-normal">{row['Drawing']}</p>
                      </td>
                      {/* Add other table cells here */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <Footer />

      <Modal show={showModal} onHide={handleModalClose}>
        {/* Modal content goes here */}
      </Modal>
    </div>
  );
}
