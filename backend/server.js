const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const roles = require("./roles.json");

app.get("/api/role/:roleName", (req, res) => {

    const roleName =
        req.params.roleName.toLowerCase();

    const foundRole =
        Object.keys(roles).find(role =>
            role.toLowerCase() === roleName
        );

    if (!foundRole) {

        return res.status(404).json({
            message: "Role not found"
        });

    }

    res.json({
        role: foundRole,
        skills: roles[foundRole]
    });

});

app.listen(5000, () => {

    console.log(
        "Server running on port 5000"
    );

});