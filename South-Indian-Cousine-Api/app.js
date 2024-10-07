const express = require("express");
const fs = require("fs");
const { get } = require("http");

const app = express();
const dishes = JSON.parse(fs.readFileSync(`${__dirname}/dishes.json`, "utf-8"));

app.use(express.json());

const getDishes = (req, res) => {
  res.send(dishes);
};

const getDish = (req, res) => {
  const id = req.params.id * 1;
  if (id > dishes.length || id < 1) {
    return res.status(404).send({
      status: "failed",
      data: "Dish not found",
    });
  }
  const dish = dishes.find((dish) => dish.id === id);
  res.send(dish);
};

const createDishes = (req, res) => {
  const newId = dishes[dishes.length - 1].id + 1;
  const newDish = Object.assign({ id: newId }, req.body);
  dishes.push(newDish);
  fs.writeFile(`${__dirname}/dishes.json`, JSON.stringify(dishes), (err) => {
    if (err) throw err;
    res.send(newDish);
  });
};

const updateDish = (req, res) => {
  const id = req.params.id * 1;
  if (id > dishes.length || id < 1) {
    return res.status(404).send({
      status: "failed",
      data: "Dish not found",
    });
  }
  const dish = dishes.find((dish) => dish.id === id);
  if (!dish) {
    return res.status(404).send({
      status: "failed",
      data: "Dish not found",
    });
  }
};

const deleteDish = (req, res) => {
  const id = req.params.id * 1;
  if (id > dishes.length || id < 1) {
    return res.status(404).send({
      status: "failed",
      data: "Dish not found",
    });
  }
  const dish = dishes.find((dish) => dish.id === id);
  if (!dish) {
    return res.status(404).send({
      status: "failed",
      data: "Dish not found",
    });
  }
};

app.get("/dishes", getDishes);

app.get("/dishes/:id", getDish);

app.post("/dishes", createDishes);

app.patch("/dishes/:id", updateDish);

app.delete("/dishes/:id", deleteDish);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
