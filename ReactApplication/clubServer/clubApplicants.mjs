import express from 'express';
import Ajv from 'ajv';

const ajv = new Ajv();
const app = express();

const schema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1,
            maxLength: 25
        },
        email: {
            type: "string",
            pattern: "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$"
        },
        password: {
            type: "string",
            pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$"
        },
        confirmPassword: {
            type: "string",
            pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$"
        },
        selectOption: {
            type: "string"
        },
        comments: {
            type: "string",
            minLength: 1,
            maxLength: 100
        }
    },
    required: ["name", "email", "password", "confirmPassword"],
    additionalProperties: false
  }

const validate = ajv.compile(schema);

function jsonErrors(err, req, res, next) {
    console.log(JSON.stringify(err));
    res.status(500);
    res.json(err);
}

app.post('/applicants', express.json({ limit: 300}), jsonErrors, function (req, res) {
    let applicantData = {
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    confirmPassword : req.body.confirmPassword,
    selectOption : req.body.selectOption,
    comments : req.body.comments,
    };

    const valid = validate(applicantData);
    if (!valid) {
        res.status(401).json({ error: true, message: 'Please check the format of the input fields and try again' });
        return;
    }
    else
        res.json(applicantData);
});

const host = '127.0.0.1';
const port = '2226';

app.listen(port, host, function () {
    console.log(`clubApplicants.mjs app listening on IPv4: ${host}:${port}`);
});