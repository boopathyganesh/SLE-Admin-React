const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./creds/service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
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
        
        // Select the table element you want to scrape.
        const table = $('table'); // Replace 'table' with your specific selector.
        
        // Iterate through the rows of the table and extract data.
        table.find('tr').each((index, row) => {
        const columns = $(row).find('td'); // Change 'td' to 'th' or other selectors if needed.
        
         // Process and log or store the data as needed.
        const rowData = columns.map((index, column) => $(column).text()).get();
        console.log(new Response(JSON.stringify(rowData)));
        return new Response(JSON.stringify(rowData)),link
        });
        } else {
        console.error('Failed to fetch the page.');
        }
        } catch (error) {
        console.error('Error:', error);
        }
  }

// // Route to insert data into Firebase Realtime Database
// app.post('/insertData', async (req, res) => {
//   try {
//     const { link } = req.body;
//     const tableData = await extractTableData(link);

//     // Initialize the Firebase Realtime Database reference
//     const db = admin.database();
//     const ref = db.ref('your-database-path');

//     // Push the table data to the database
//     const newRef = ref.push();
//     newRef.set(tableData);

//     res.status(200).json({ message: 'Data inserted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const link = 'https://www.valves.co.uk/vendor/link.php?link=Msd5OEAEWGBH8No6O6cD'
extractTableData(link)