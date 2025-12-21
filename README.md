# Debloated jumia
this is a simple web scraping project that scrapes Jumia products using node, express, and tor for ip rotation (to avoid being blocked).

how to run:
1. make sure you have tor installed and running on your machine.
2. to enable the control port (necessary for IP rotation), you may need to edit your torrc file (usually located at /etc/tor/torrc or C:\Users\YourUsername\AppData\Roaming\tor\torrc) and add the following lines:
   
   ControlPort 9051
   HashedControlPassword <your_hashed_password>

   you can generate a hashed password using the command:
   ```sh 
   tor --hash-password your_password
   ```
3. install the dependencies:
   ```sh
   npm install # or pnpm install
   ```
4. start the server:
   ```sh
   npm run dev # or pnpm dev
   ```
