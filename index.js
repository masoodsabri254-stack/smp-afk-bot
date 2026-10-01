const mineflayer = require('mineflayer');
const http = require('http');

// Choose a secure password for your bot's EasyAuth account
const BOT_PASSWORD = "botlomjank33"; 

// Create a fake web server for Render (Required to keep the free service alive)
http.createServer((req, res) => {
  res.write("Bot is alive!");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'lomjanksmp.play.hosting', 
    port: 25565,                         
    username: 'SMP_Gatekeeper',          
    version: '26.3' 
  });

  // Handle EasyAuth login/registration on spawn
  bot.on('spawn', () => {
    console.log('Bot spawned. Attempting EasyAuth verification...');
    
    // Wait 2 seconds after spawning to send the commands safely
    setTimeout(() => {
      bot.chat(`/register ${BOT_PASSWORD} ${BOT_PASSWORD}`);
      bot.chat(`/login ${BOT_PASSWORD}`);
    }, 2000); 

    // Human-like random looking movement loop (runs every 30 seconds)
    setInterval(() => {
      if (bot.entity) {
        const yaw = Math.random() * Math.PI * 2;
        const pitch = (Math.random() - 0.5) * Math.PI;
        bot.look(yaw, pitch);
      }
    }, 30000);
  });

  // Auto-reconnect loop if kicked or server restarts
  bot.on('end', () => {
    console.log('Disconnected from server. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

createBot();
