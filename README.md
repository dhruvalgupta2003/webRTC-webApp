# WebRTC Web App with Signaling Server


This is a WebRTC-based web application that allows users to establish real-time video communication between two peers. The application uses a signaling server for WebRTC negotiation, enabling peer-to-peer connections.

## Features

- Real-time video communication using WebRTC technology.
- Signaling server for WebRTC negotiation.
- Create an offer and answer to establish a peer-to-peer connection.
- Add ICE candidates for WebRTC connection establishment.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dhruvalgupta2003/webRTC-webApp.git
   cd webRTC-webApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server and client:

   ```bash
   # Start the server (signaling server)
   node server.js

   # Start the client (web application)
   npm start
   ```

4. Open your web browser and navigate to `http://localhost:3000` to access the WebRTC web application.

## How to Use

1. When the application loads, it will request access to your camera and microphone. Grant the required permissions to proceed.

2. Once the camera stream is accessed, you will see two video boxes on the page. The left one displays your local video stream, while the right one is for the remote video stream.

3. To establish a connection between two peers, follow these steps:

   - Click the "Create Offer" button to create an offer. The local description (SDP) will be displayed in the text area.
   - Share the local description with the remote peer using your preferred communication channel (e.g., copy and paste, messaging app).
   - The remote peer should paste the received offer into their text area and click the "Set Remote Description" button.
   - After setting the remote description, the remote peer should click the "Create Answer" button to generate an answer.
   - Share the generated answer with the original peer.
   - Paste the received answer into your text area and click the "Set Remote Description" button.

4. Once the offer and answer are exchanged, the WebRTC connection will be established, and the video streams will be displayed in both video boxes.

5. To add ICE candidates, follow these steps:

   - Both peers should click the "Add Candidates" button to add the ICE candidates.
   - Share the generated ICE candidates between peers.

6. The video communication is now established, and you can enjoy real-time video streaming between two peers.

## Technologies Used

- React: Front-end framework for building user interfaces.
- WebRTC: Real-time communication technology for audio and video streaming.
- Socket.io: Library for enabling real-time, bidirectional communication between clients and servers.
- Tailwind CSS: Utility-first CSS framework for easy and beautiful styling.

## Contribution

Contributions to this project are welcome. If you find any issues or have suggestions for improvement, please create a new issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for more details.

---

This README.md template provides an overview of the WebRTC web application, installation instructions, usage guide, technology stack, contribution guidelines, and licensing information. Feel free to customize the content based on your specific project details.
