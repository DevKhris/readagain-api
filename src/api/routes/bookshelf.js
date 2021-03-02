app.get('/api/bookshelf/get/:user', (req, res) => {
	res.send('Bookshelf Example');
});

app.post('/api/bookshelf/:id/add', (req, res) => {
	res.send('Book Added');
});

app.patch('/api/bookshelf/:id/update', (req, res) => {
	res.send('Book Updated');
});

app.delete('/api/bookshelf/:id/delete', (req, res) => {
	res.send('Book Deleted');
});
