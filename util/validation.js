const express = require("express");
const Joi = require("joi");

const validateDroneRequest = (req, res, next) => {
    const schema = Joi.object({
        serial: Joi.string().required(),
        model: Joi.string().valid("Lightweight", "Middleweight", "Cruiserweight", "Heavyweight").required(),
        weight: Joi.number().min(0).max(500).required(),
        batteryCapacity: Joi.number().min(0).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message;
        const trimmedMessage = errorMessage.replace(/['"]/g, "");
        return res.status(400).json({ message: "Invalid drone data", error: trimmedMessage });
    }
    next();
}

module.exports = {
    validateDroneRequest
};