const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());
const postRoutes = require('./routes/posts');

app.use('/api/posts', postRoutes);



app.listen(8000, () => {
    console.log('Listening on port 8000...')
})
