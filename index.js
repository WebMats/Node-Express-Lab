const express = require('express');
const app = express();


app.use(express.json());

const postRoutes = require('./routes/posts');

app.use('/api/posts', postRoutes);



app.listen(8000, () => {
    console.log('Listening on port 8000...')
})
