# drone-api
Mobile delivery system for medications using drones
This project is a RESTful API built with Node.js and Express, designed to manage drones and their operations, including loading medications and checking battery levels.

## Features
- Register drones with serial numbers, model, weight limit, and battery capacity.
- Load medications onto drones with details like name, weight, code, and an uploaded image.
- Check battery levels of drones.
- Recharge drones to full battery capacity.
- Retrieve information about all drones or specific drones by serial number.
- List medications loaded on a specific drone.

Bonus Features
- Automatically reduce drone battery levels over time once drone is active.
- Periodically check drone battery levels and recharge once empty.

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/demiladebabajide/drone-api
    ```
2. Navigate to the project directory:
    ```bash
    cd drone-api
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the server:
    ```bash
    npm run start
    ```
## Usage
- **Register a Drone**: POST `/drones`
- **Load Medications**: POST `/drones/:serial/load`
- **Check Battery Level**: GET `/drones/:serial/battery`
- **Recharge Drone**: POST `/drones/:serial/recharge`   
- **Get All Drones**: GET `/drones`
- **Get Available Drones**: GET `/drones?state=IDLE`
- **Get Drone by Serial**: GET `/drones/:serial`
- **Get Drone Medications**: GET `/drones/:serial/medications`

## Environment Variables
- `MONGO_URI`: MongoDB connection string.
- `PORT`: Port number for the server.
- `NODE_ENV`: Environment mode (dev, test).

## Testing
- Use Postman or any API testing tool to test the endpoints. 
- Ensure the server is running before making requests.

## Running Tests
1. Ensure you have Jest installed:
    ```bash
    npm install --save-dev jest
    ```
2. Run the tests:
    ```bash
    npm test
    ```

## Author
- Demi Babajide ☯️ - [GitHub](https://www.github.com/demiladebabajide) (There's not much there but check it out anyways 😉)