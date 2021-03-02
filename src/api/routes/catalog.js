
app.get('/api/bookshelf/get/:user', (req, res) => {
	res.send('Bookshelf Example');
});

app.get('/api/catalog', (req, res) => {
	 Catalog.find({}, function(err, catalog) {
		res.status(200).send(catalog);	
	});
});