const express = require('express');


const app = express();
const PORT = 4000;

require('./conn');
app.use(express.json());

const UserRoutes = require('./Routes/user');
const ResumeRoutes = require('./Routes/resume');

app.use('/api/resume', ResumeRoutes);
app.use('/api/user', UserRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})