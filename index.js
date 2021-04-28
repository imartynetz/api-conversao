const express = require('express');
const os = require('os')
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/fahrenheit/:valor/celsius', (req, res) => {

    let fahrenheit = req.params.valor;
    let celsius = (fahrenheit - 32) * 5 / 9;
    res.json({ "celsius": celsius, "maquina": os.hostname() });
});

app.get('/celsius/:valor/fahrenheit', (req, res) => {

    let celsius = req.params.valor;
    let fahrenheit = (celsius * 9 / 5) + 32;
    res.json({ "fahrenheit": fahrenheit, "maquina": os.hostname() });
});

app.get('/celsius/:valor/kelvin', (req, res) => {

    let celsius = req.params.valor;
    let kelvin = (celsius + 273.15);
    // Don't know what's happen, but this field is the only one showing as a string in response
    // So I forced it to be a number.
    res.json({ "kelvin": Number(kelvin), "maquina": os.hostname() });
});

app.get('/kelvin/:valor/celsius', (req, res) => {

    let kelvin = req.params.valor;
    let celsius = (kelvin - 273.15);
    res.json({ "celsius": celsius, "maquina": os.hostname() });
});

app.get('/fahrenheit/:valor/kelvin', (req, res) => {

    let fahrenheit = req.params.valor;
    let kelvin = (fahrenheit -32)/1.8 +273.15;
    res.json({ "kelvin": kelvin, "maquina": os.hostname() });
});

app.get('/kelvin/:valor/fahrenheit', (req, res) => {

    let kelvin = req.params.valor;
    let fahrenheit = (kelvin - 273.15)* 1.8+ 32.00;
    res.json({ "fahrenheit": fahrenheit, "maquina": os.hostname() });
});

app.listen(8080, () => {
    console.log("Servidor rodando na porta 8080");
});
