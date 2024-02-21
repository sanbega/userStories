import express from "express";
import {
  getItem,
  getItemByI,
  sharedItem,
  deleteItem,
  getSharedItemByI,
  createItem,
  toggleCompleted,
  getUserByEmail,
  getUserByID,
} from "./database.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8080",
  methods: ["POST", "GET"],
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/item/:id", async (req, res) => {
  const items = await getItemByI(req.params.id);
  res.status(200).send(items);
});

app.get("/item/shared_item/:id", async (req, res) => {
  const item = await getSharedItemByI(req.params.id);
  const author = await getUserByID(item.user_id);
  const shared_with = await getUserByID(item.shared_with_id);
  res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
  const user = await getUserByID(req.params.id);
  res.status(200).send(user);
});

app.put("/items/:id", async (req, res) => {
  const { value } = req.body;
  const item = await toggleCompleted(req.params.id, value);
  res.status(200).send(item);
});

app.delete("/items/:id", async (req, res) => {
  await deleteItem(req.params.id);
  res.send({ message: "item deleted successfully" });
});

app.post("/items/shared_items", async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const sharedItem = await sharedTodo(todo_id, user_id, userToShare.id);
  res.status(200).send(sharedItem);
});

app.post("/items", async (req, res) => {
  const { user_id, title } = req.body;
  const item = await createItem(user_id, title);
  res.status(201).send(item);
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
