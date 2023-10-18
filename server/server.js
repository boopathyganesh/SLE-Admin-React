const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./creds/service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sledb-29e51-default-rtdb.asia-southeast1.firebasedatabase.app',
});

const app = express();
app.use(cors());
app.use(express.json());

// Function to extract table data from a given link
async function extractTableData(link) {
  try {
    const response = await axios.get(link);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      // Find the table by any means (class, ID, or any selector).
      const table = $('table'); // You can use a specific selector here if needed.

      const tableData = [];

      const headers = [];

      table.find('tr').each((rowIndex, row) => {
        const columns = $(row).find('td'); // You can change 'td' to 'th' or other selectors if needed.

        if (columns.length > 0) {
          const rowData = {};

          columns.each((colIndex, column) => {
            if (rowIndex === 0) {
              // Handle the header row
              headers.push($(column).text().trim());
            } else {
              // Handle the data rows
              rowData[headers[colIndex]] = $(column).text().trim();
            }
          });

          if (rowIndex > 0) {
            tableData.push(rowData);
          }
        }
      });

      return tableData;
    } else {
      console.error('Failed to fetch the page.');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Route to insert data into Firebase Realtime Database
app.post('/insertData', async (req, res) => {
  try {
    const { link } = req.body;
    const tableData = await extractTableData(link);

    // Initialize the Firebase Realtime Database reference
    const db = admin.database();
    const ref = db.ref('ComponentIndex'); // Reference to the ComponentIndex

    // Generate custom key based on the 'Item'
    const itemKey = `Component_${tableData[0]['Item']}`;

    // Set the data using the custom key
    ref.child(itemKey).set(tableData);

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//const link = 'https://www.valves.co.uk/vendor/link.php?link=Msd5OEAEWGBH8No6O6cD'
//extractTableData(link)



// async function extractTableData(link) {
//   try {
//     const response = await axios.get(link);
//     if (response.status === 200) {
//       const $ = cheerio.load(response.data);

//       // Find the table by any means (class, ID, or any selector).
//       const table = $('table'); // You can use a specific selector here if needed.

//       const tableData = [];

//       table.find('tr').each((rowIndex, row) => {
//         const columns = $(row).find('td'); // You can change 'td' to 'th' or other selectors if needed.

//         if (columns.length > 0) {
//           const rowData = {};

//           columns.each((colIndex, column) => {
//             rowData[`Column ${colIndex + 1}`] = $(column).text().trim();
//           });

//           tableData.push(rowData);
//         }
//       });

//       return tableData;
//     } else {
//       console.error('Failed to fetch the page.');
//       return null;
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return null;
//   }
// }

// // Example usage:
// extractTableData('https://www.valves.co.uk/vendor/link.php?link=Msd5OEAEWGBH8No6O6cD')
//   .then((result) => {
//     if (result) {
//       console.log('Table Data:', result);
//     } else {
//       console.log('No data extracted.');
//     }
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
