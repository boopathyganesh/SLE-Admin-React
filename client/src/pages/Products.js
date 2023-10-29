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

  const [selectedItem, setSelectedItem] = useState(null);
  const [uniqueItems, setUniqueItems] = useState([]);

  // Function to fetch unique 'Item' values from the server
  const fetchUniqueItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/fetch-unique-items');
      if (response.status === 200) {
        const items = await response.json();
        setUniqueItems(items);
      }
    } catch (error) {
      console.error('Error fetching unique items:', error);
    }
  };

  useEffect(() => {
    // Fetch data from your server
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

    // Fetch unique 'Item' values
    fetchUniqueItems();
  }, []);

  // Handle when an 'Item' is selected from the dropdown
  const handleItemSelect = (selectedValue) => {
    setSelectedItem(selectedValue);
  };

  // Filter and map the details based on the selected 'Item'
  const filteredItems = selectedItem ? data[selectedItem] || [] : [];

  return (
    <div className="body-wrapper">
      <Navbar />
      <div className="container-fluid">
        <h5 className="card-title fw-semibold mb-4 text-voilet text-center">SLE Order Management</h5>

        {/* Dropdown for selecting 'Item' based on unique values */}
        <div className="form-group mt-3">
          <label htmlFor="itemDropdown" className="select text-danger mb-3">Select Item:</label>
          <select
            id="itemDropdown"
            className="form-control"
            value={selectedItem}
            onChange={(e) => handleItemSelect(e.target.value)}
          >
            <option value="">-- Select an Item --</option>
            {uniqueItems.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Table for displaying details based on the selected 'Item' */}
        <div className="table-responsive">
          <table className="table text-nowrap mb-0 align-middle">
            {/* Table headers here */}
            <thead className="text-center fs-4">
              {/* ... (headers as in your original code) */}
            </thead>
            <tbody>
              {filteredItems.map((row, index) => (
                <tr key={index}>
                  {/* ... (rest of the rows as in your original code) */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {/* ... (existing code for the item details modal) */}
    </div>
  );
}
