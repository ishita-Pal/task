const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const taskRoutes = require('./Routes/taskRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
