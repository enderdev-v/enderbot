import express from 'express';
const app = express();

const port = process.env.PORT || 10000;

app.get('/', (_req, res) => {
    res.send('<h1>endkachu nice<h1> <br />');
	res.send('Hola Mundo!');
});
app.listen(port as number, '0.0.0.0', () => {
	console.log(`enderbot en la web ${port}`);
});