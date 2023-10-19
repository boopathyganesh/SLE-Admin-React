import { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/globals.css';

export default function Products() {
  const [data, setData] = useState([]); // State to hold the fetched data

  useEffect(() => {
    // Fetch data from your API
    fetch('http://localhost:3000/api/fetch-data') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        // Convert the object to an array of objects
        const dataArray = Object.keys(data).map(key => ({
          key,
          ...data[key]
        }));
        setData(dataArray); // Set the fetched data to the state
      })
      .catch(error => console.error('Error fetching data:', error));
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
                <div className="table-responsive">
                  <table className="table text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                      <tr class="text-center">
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Item</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Buyer</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Drawing</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Qty Ordered</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Due Date / Promised Date</h6>
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
                            <h6 className="fw-semibold mb-0">{row['Item']}</h6>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Buyer']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Drawing']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Qty Ordered']}</p>
                          </td>
                          <td className="border-bottom-0">
                            <p className="mb-0 fw-normal">{row['Due DatePromised Date']}</p>
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
    </div>
  );
}
