const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set path to the public folder
app.use(express.static(path.join(__dirname, 'public')));

try {
  app.post('/add', (req, res) => {
      const { num1, num2 } = req.body

      if (!num1 || !num2) {
          res.status(400).send('Fields are not correct.');
      }
      res.status(200).send({ 
        sum: addition(Number(num1), Number(num2)) 
      });
  });

  
} catch (err) {
  err.status(400).send('error :', err.message)
}

function addition(num1, num2) {
  return (num1 + num2)
}

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on ${PORT}`);
});

