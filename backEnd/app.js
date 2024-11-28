const express = require('express');
const path = require('path');

//Middlewares
const corsMiddleware = require('./middlewares/corsMiddleware');
// Rotas
const loginRoutes = require('./routes/loginRoutes');
const profileRoutes = require('./routes/profileRoutes');
const receivingRoutes = require('./routes/receivingRoutes');
const reportingRoutes = require('./routes/reportingRoutes');
const sendingRoutes = require('./routes/sendingRoutes');
const stockRoutes = require('./routes/stockRoutes');
const storesRoutes = require('./routes/storesRoutes');
const talaoRoutes = require('./routes/talaoRoutes');
const userRoutes = require('./routes/userRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const andressRoutes = require('./routes/adressRoutes');
const assignProfileModuleRoutes = require('./routes/assignProfileModuleRoutes');
const app = express();

// Middleware global de CORS
app.use(corsMiddleware);

// Middleware para servir arquivos estáticos (CSS e JS)
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.json()); // Necessário para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Necessário para interpretar dados URL-encoded

// Rotas para as páginas HTML
app.use('/', loginRoutes);
app.use('/', reportingRoutes);
app.use('/', stockRoutes);
app.use('/', userRoutes);
app.use('/', storesRoutes);
app.use('/', talaoRoutes);
app.use('/', profileRoutes);
app.use('/', sendingRoutes);
app.use('/', receivingRoutes);
app.use('/', moduleRoutes);
app.use('/', andressRoutes);
app.use('/', assignProfileModuleRoutes);


module.exports = app;
