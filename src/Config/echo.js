import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// window.Pusher = Pusher;

// const echo = new Echo({
//     broadcaster: 'reverb',
//     key: import.meta.env.VITE_REVERB_APP_KEY || 'fbggeepw4o0v32toc5hn',
//     wsHost: import.meta.env.VITE_REVERB_HOST || 'localhost',
//     wsPort: import.meta.env.VITE_REVERB_PORT || 8080,
//     wssPort: import.meta.env.VITE_REVERB_PORT || 8080,
//     forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'http') === 'https',
//     enabledTransports: ['ws', 'wss'],
//     disableStats: true,
// });

window.Pusher = Pusher;

// Configure Laravel Echo to connect to Reverb
const echo = new Echo({
    broadcaster: 'reverb',
    key: 'fbggeepw4o0v32toc5hn', // Must match REVERB_APP_KEY in Laravel .env
    wsHost: 'localhost',
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    disableStats: true,
});

// Log connection status
echo.connector.pusher.connection.bind('connected', () => {
    console.log('✅ Connected to Laravel Reverb');
});

echo.connector.pusher.connection.bind('disconnected', () => {
    console.log('❌ Disconnected from Laravel Reverb');
});

echo.connector.pusher.connection.bind('error', (err) => {
    console.error('❌ Reverb connection error:', err);
});

export default echo;