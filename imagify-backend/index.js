const app = require('./app');
const {connectDatabase} = require('./config/database');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});