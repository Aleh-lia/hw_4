const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3030;

app.use(express.json());

// Путь к файлу, где будут храниться данные пользователей
let dataFilePath = './static/users.json';

app.get('/users', async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const users = JSON.parse(data);
    res.json(users);
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users', async (req, res) => {
  try {
    uniqueID += 1;
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const users = JSON.parse(data);

    const newUser = req.body;
    users.push(newUser);

    await fs.writeFile(dataFilePath, JSON.stringify(users));
    res.json(newUser);
  } catch (error) {
    console.error('Error writing file:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/users/:id', async (req, res) => {
    try {
      const userId = req.params.id;
  
      const data = await fs.readFile(dataFilePath, 'utf-8');
      let users = JSON.parse(data);
  
      const userIndex = users.findIndex(user => user.id === userId);
  
      if (userIndex !== -1) {
        const updatedUser = req.body;
        users[userIndex] = { ...users[userIndex], ...updatedUser };
  
        await fs.writeFile(dataFilePath, JSON.stringify(users));
  
        res.json({ message: 'User updated successfully', user: users[userIndex] });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.delete('/users/:id', async (req, res) => {
    try {
      const userId = +req.params.id;
  
      const data = await fs.readFile(dataFilePath, 'utf-8');
      let users = JSON.parse(data);
  
      const userIndex = users.findIndex(user => user.id === userId);
  
     
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
  
  
        await fs.writeFile(dataFilePath, JSON.stringify(users));
  
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Internal Server Error');
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});