# Qwitter Testing
## Overview
Welcome to the Qwitter Testing repository! This repository contains testing scripts for frontend, cross-platform, and stress tests for the backend of the Qwitter application. The testing suite is designed to ensure the robustness and reliability of the application across different layers.

## Frontend Tests
The frontend tests in this repository are written using Cypress, a powerful end-to-end testing framework. To run the frontend tests, follow these steps:

1. Open a terminal window.
3. Navigate to the `/Web` directory of this repository: `cd Web`.
2. Run `npm i` to install all required packages.
4. Run the command: `npx cypress open` to open the Cypress GUI.
5. Click on E2E tests, then choose your preferred browser to run tests inside.
6. Alternatively, you can run the tests headless using `npx cypress run`.
## Cross-Platform Tests
The cross-platform tests in this repository are written using Appium in JavaScript. To run the tests, follow these steps:

1. Ensure you have an android device running in an emulator like the Android Emulator in Android Studio.
2. Open the Appium Desktop app and start a new server. Configure it with port number `4724` and make sure to allow CORS. 
3. Start the server and navigate to the appium inspector.
4. Configure the appium inspector with your desired capabilities. These will look something like this:
   ```
   {
     "platformName": "Android",
     "appium:deviceName": <DeviceName>,
     "appium:platformVersion": <AndroidVersion>,
     "appium:app": <PathToYourApp>,
     "appium:automationName": "UIAutomator2"
   }
5. Start the session
6. Navigate to the `/Mobile` directory of this repository: `cd Mobile`.
7. Run `npm i` to install all required packages.
8. Run `npx wdio --spec <PathToYourSpec>` to run a test.
9. Make sure to run the script `kill-port.bat` after any test you run to kill the process running on port `4723`
## Stress Tests
The stress tests in this repository are written using k6. To run the stress tests, follow these steps:

1. Navigate to the `/Stress` directory of this repository: `cd Stress`.
2. Run `npm i` to install all required packages.
3. Create a `config.js` file and configure it with your fixture data.
4. Run `k6 run <PathToYourSpec>` to run a stress test.
5. These tests can be configured to run in a docker container and we can use grafana/influxdb for visualizations.
6. To do so, first run `docker-compose up -d influxdb grafana`
7. Then run `docker-compose run k6 run <PathToYourSpec>` to run the spec file inside the docker container.
8. You can now navigate to `localhost:3000` to view live metrics of the stress test.
9. Please ensure that you have Docker and k6 installed on your machine before running the stress tests.
