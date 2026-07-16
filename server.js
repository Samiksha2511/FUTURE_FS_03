const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE = "businesses.json";

// Get all businesses
app.get("/api/businesses", (req, res) => {
    const data = fs.readFileSync(FILE);
    res.json(JSON.parse(data));
});

// Add new business
app.post("/api/businesses", (req, res) => {
    const businesses = JSON.parse(fs.readFileSync(FILE));

    const newBusiness = {
        id: Date.now(),
        ...req.body
    };

    businesses.push(newBusiness);

    fs.writeFileSync(FILE, JSON.stringify(businesses, null, 2));

    res.json({
        message: "Business Added Successfully",
        business: newBusiness
    });
});

app.listen(3000, () => {
    console.log("Server Running at http://localhost:3000");
});