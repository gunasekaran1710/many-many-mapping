const express=require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const routes=require('../many-many mapping/routes/userRoutes');
const app=express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
