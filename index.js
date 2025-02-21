const express = require("express");
const app = express();

const PORT = process.env.PORT || 5500;

app.use(express.json());

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. Expected an array in 'data'."
      });
    }

    const data = req.body.data;
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    for (const item of data) {
      if (!isNaN(item) && item !== "") {
        numbers.push(parseInt(item, 10));
      } else if (typeof item === "string" && item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (!highest_alphabet || item.toUpperCase() > highest_alphabet.toUpperCase()) {
          highest_alphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "ayush",
      email: "ayushgupta777@gmail.com",
      roll_number: "22BCS15510",
      numbers,
      alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  });
