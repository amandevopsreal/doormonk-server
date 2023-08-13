# Haircut Booking App - Server README

This repository contains the server code for the Haircut Booking App, which is built using PostgreSQL, Node.js, and Express. Please note that the server implementation has been replaced with a different technology stack. 

## New Server Implementation

We have migrated the server implementation of the Haircut Booking App to a new technology stack for improved performance and scalability. The new server is built using [MongoDB](https://www.mongodb.com/), [Node.js](https://nodejs.org/), and [Fastify](https://www.fastify.io/) framework. This change allows for better handling of real-time updates and a more streamlined development process.

## Prerequisites

Before running the new server, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (version X.X.X)
- [MongoDB](https://www.mongodb.com/) (version X.X.X)

## Installation

1. Clone this repository to your local machine.
   
   ```
   git clone https://github.com/your-username/new-haircut-booking-server.git
   ```

2. Navigate to the project directory.
   
   ```
   cd new-haircut-booking-server
   ```

3. Install the required dependencies.
   
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.

2. Add the following environment variables and provide appropriate values.

   ```
   DATABASE_URL=mongodb://localhost:27017/haircut_booking
   PORT=3000
   ```

## Usage

1. Start the server.
   
   ```
   npm start
   ```

2. The server will be accessible at `http://localhost:3000`.

## API Documentation

For API documentation and usage instructions, please refer to the [API Documentation](api-documentation.md) file.

## Contributing

We welcome contributions to enhance the functionality and performance of the Haircut Booking App. Please refer to the [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get involved.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for your interest in the Haircut Booking App! If you have any questions or concerns, please feel free to contact us at [contact@haircutbookingapp.com](mailto:contact@haircutbookingapp.com).
