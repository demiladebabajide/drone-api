const req = require("supertest");
const index = require("../index_mock");
const droneService = require("../services/drone.service");
const dispatchService = require("../services/dispatch.service");
const mongoose = require('mongoose');


jest.mock("../services/drone.service");
jest.mock("../services/dispatch.service");

describe("Drone Controller Tests", () => {

    afterAll(async () => {
        jest.clearAllMocks();
        await mongoose.connection.close();
    });

    test("valid drone creation request should return successful", async () => {
        const droneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
        };

        await droneService.createDrone.mockResolvedValue(droneData);

        const response = await req(index).post("/api/drones").send(droneData);

        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Drone created successfully");
        expect(response.body.drone).toEqual(droneData);
    });

    test("invalid drone creation request should return failed", async () => {
        const droneData = {
            serial: "002",
            model: "Heavyweight",
            weight: 1000,
            batteryCapacity: 50,
        };

        await droneService.createDrone.mockResolvedValue(droneData);

        const response = await req(index).post("/api/drones").send(droneData);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid drone data");
        expect(response.body.error).toEqual("weight must be less than or equal to 500");
    });

    test("duplicate drone creation request should return error", async () => {
        const droneData = {
            serial: "001",
            model: "Heavyweight",
            weight: 100,
            batteryCapacity: 50,
        };
        const droneData2 = {
            serial: "001",
            model: "Cruiserweight",
            weight: 50,
            batteryCapacity: 90,
        };
        await droneService.createDrone
            .mockResolvedValueOnce(droneData)
            .mockRejectedValueOnce({
                statusCode: 500,
                message: "Error creating drone: Drone with this serial already exists"
            });

        await req(index).post("/api/drones").send(droneData);
        const response = await req(index).post("/api/drones").send(droneData2);

        expect(response.body.error).toBe("Error creating drone: Drone with this serial already exists");
        expect(response.statusCode).toBe(500);

    });

    test("valid get drone by serial request should return successful", async () => {
        const droneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
        };

        await droneService.findBySerial.mockResolvedValue(droneData);
        await req(index).post("/api/drones").send(droneData);

        const response = await req(index).get("/api/drones/001");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(droneData);
    });

    test("invalid get drone by serial request should return failed", async () => {
        const droneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
        };

        await droneService.findBySerial.mockResolvedValue(null);
        await req(index).post("/api/drones").send(droneData);

        const response = await req(index).get("/api/drones/002");

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toEqual("Drone not found");
    });
});

describe("Dispatch Controller Tests", () => {

    afterAll(async () => {
        jest.clearAllMocks();
        await mongoose.connection.close();
    });

    test("valid drone loading request should return successful", async () => {
        const droneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
        };

        await droneService.createDrone.mockResolvedValue(droneData);
        await req(index).post("/api/drones").send(droneData);

        const loadedDroneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
            medications: [
                {
                    name: "Panadol",
                    weight: 150,
                    code: "PA_900_01",
                    image: "panadol-image.jpeg"
                }
            ]
        };
        const medicationData = {
            name: "Panadol",
            weight: 150,
            code: "PA_900_01",
            image: "panadol-image.jpeg"
        };

        await dispatchService.loadDrone.mockResolvedValue(loadedDroneData);

        const response = await req(index).post("/api/drones/001/load").send(medicationData);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Drone 001 loaded successfully");
        expect(response.body.drone).toEqual(loadedDroneData);
    });

    test("low battery drone loading request should return failed", async () => {

        const droneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
        };

        await droneService.createDrone.mockResolvedValue(droneData);
        await req(index).post("/api/drones").send(droneData);

        const medicationData = {
            name: "Panadol",
            weight: 400,
            code: "PA_900_01",
            image: "panadol-image.jpeg"
        };

        await dispatchService.loadDrone.mockRejectedValueOnce({
            statusCode: 500,
            message: "Error loading drone: Drone battery is too low"
        });

        const response = await req(index).post("/api/drones/001/load").send(medicationData);

        expect(response.body.error).toBe("Error loading drone: Drone battery is too low");
        expect(response.statusCode).toBe(500);
    });
    
    test("excess weight drone loading request should return failed", async () => {

        const droneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
        };

        await droneService.createDrone.mockResolvedValue(droneData);
        await req(index).post("/api/drones").send(droneData);

        const medicationData = {
            name: "Panadol",
            weight: 400,
            code: "PA_900_01",
            image: "panadol-image.jpeg"
        };

        await dispatchService.loadDrone.mockRejectedValueOnce({
            statusCode: 500,
            message: "Error loading drone: Drone capacity exceeded"
        });

        const response = await req(index).post("/api/drones/001/load").send(medicationData);

        expect(response.body.error).toBe("Error loading drone: Drone capacity exceeded");
        expect(response.statusCode).toBe(500);
    });

    test("unavailable drone loading request should return failed", async () => {

        const droneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
        };

        await droneService.createDrone.mockResolvedValue(droneData);
        await req(index).post("/api/drones").send(droneData);

        const medicationData = {
            name: "Panadol",
            weight: 400,
            code: "PA_900_01",
            image: "panadol-image.jpeg"
        };

        await dispatchService.loadDrone.mockRejectedValueOnce({
            statusCode: 500,
            message: "Error loading drone: Drone is currently unavailable"
        });

        const response = await req(index).post("/api/drones/001/load").send(medicationData);

        expect(response.body.error).toBe("Error loading drone: Drone is currently unavailable");
        expect(response.statusCode).toBe(500);
    });

    test("valid get drone medications request should return successful", async () => {
         const loadedDroneData = {
            serial: "001",
            model: "Cruiserweight",
            weight: 350,
            batteryCapacity: 100,
            medications: [
                {
                    name: "Panadol",
                    weight: 150,
                    code: "PA_900_01",
                    image: "panadol-image.jpeg"
                }
            ]
        };
        await dispatchService.getMedications.mockResolvedValue(loadedDroneData.medications);

        const response = await req(index).get("/api/drones/001/medications");

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(loadedDroneData.medications);
    });

    
});