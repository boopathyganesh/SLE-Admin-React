import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../styles/globals.css';

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('Item');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredData = data.filter((item) =>
    item.Item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortField].toLowerCase();
    const bValue = b[sortField].toLowerCase();

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/fetch-data')
      .then((response) => response.json())
      .then((data) => {
        const dataArray = Object.keys(data).map((key) => ({
          key,
          ...data[key],
        }));
        setData(dataArray);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="body-wrapper">
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body p-4">
                <h5 className="card-title fw-semibold mb-4 text-voilet">SLE Product Management</h5>
                <div style={{ maxHeight: "100vh", overflowY: "auto", overflowX: "auto" }}>
                  <div className="table-responsive">
                    <input
                      type="text"
                      placeholder="Search by item..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <table className="table text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                      <tr className="text-center">
                      
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
              <div className="form-group">
                <label htmlFor="Drawing">Drawing ID</label>
                <input
                  type="text"
                  id="Drawing"
                  className="form-control"
                  value={selectedItem['Drawing']}
                />
              </div>
              <div className="form-group">
                <label htmlFor="DrawingFileURL">Drawing URL</label>
                <input
                  type="text"
                  id="DrawingFileURL"
                  className="form-control"
                  value={selectedItem['DrawingFileURL']}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Current_cost">Current Cost</label>
                <input
                  type="number"
                  id="Current_cost"
                  className="form-control"
                  value={selectedItem['Current_cost']}
                />
              </div>
              {/* Add more fields as needed */}
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
