const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts/", async (req, res) => {
    try {
      const accounts = await db.select("*").from("accounts");
      res.status(200).json(accounts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "there was an error", error: err });
    }
  });
  
  server.get("/api/accounts/:id", async (req, res) => {
    try {
      const account = await db
        .first("*")
        .from("accounts")
        .where("id", req.params.id);
      res.status(200).json(account);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "there was an error", error: err });
    }
  });
  
  server.post("/api/accounts/", async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        budget: req.body.budget
      };
      // insert returns the id of the new record
      const [id] = await db.insert(payload).into("accounts");
      // await db("accounts").inssert(payload);
      const newAccount = await db
        .first("*")
        .from("accounts")
        .where("id", id);
      res.status(201).json(newAccount);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "there was an error", error: err });
    }
  });
  
  server.put("/api/accounts/:id", async (req, res) => {
    try {
      const payload = {
        name: req.body.name,
        budget: req.body.budget
      };
      await db
        .update(payload)
        .from("accounts")
        .where("id", req.params.id);
      const account = await db("accounts")
        .where("id", req.params.id)
        .first();
      res.status(200).json(account);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "there was an error", error: err });
    }
  });
  
  server.delete("/api/accounts/:id", async (req, res) => {
    try {
      const del = await db("accounts")
        .where("id", req.params.id)
        .del();
      res.status(204).json(del);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "there was an error", error: err });
    }
  });
  
module.exports = server;
