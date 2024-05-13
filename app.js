const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors')
let teams = [];

// Middleware để parse JSON data
app.use(express.json());
app.use(cors())
// Endpoint để lấy danh sách các đội
app.get('/teams', (req, res) => {
  res.json(teams);
});

// Endpoint để tạo mới một đội
app.post('/teams', (req, res) => {
  const newTeam = req.body;
  teams.push(newTeam);
  res.status(201).json(newTeam);
});

// Endpoint để cập nhật một đội
app.put('/teams/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < teams.length) {
    teams[index] = req.body;
    res.json(teams[index]);
  } else {
    res.status(404).json({ error: 'Không tìm thấy đội' });
  }
});

// Endpoint để xóa một đội
app.delete('/teams/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < teams.length) {
    const removedTeam = teams.splice(index, 1)[0];
    res.json(removedTeam);
  } else {
    res.status(404).json({ error: 'Không tìm thấy đội' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});