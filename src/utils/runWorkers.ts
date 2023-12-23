const tokenWorker = new Worker(new URL('../worker/refreshWorker.ts', import.meta.url), {type: 'module'});

const stopAutoRefreshToken = () => {
    tokenWorker.postMessage({
        'message': 'stop'
    });
}

const startAutoRefreshToken = () => {
    // wait 30 second before starting the worker
    setTimeout(() => {
        if (localStorage.getItem('authTokens') === null) {
            return;
        }
        tokenWorker.postMessage({
            'message': 'start',
            'refreshToken': JSON.parse(localStorage.getItem('authTokens')).refreshToken
        });
        tokenWorker.onmessage = (event) => {
            console.log('[WORKER] Received message:', event.data)
            if (!event.data.code || event.data?.code !== 200 || !event.data.data) {
                console.log('Error while refreshing token');
                localStorage.removeItem('authTokens');

                stopAutoRefreshToken();

                window.location.href = '/auth/login';
                return;
            }
            if (event.data.code === 200) {
                console.log('Token refreshed')
                localStorage.setItem('authTokens', JSON.stringify({
                    token: event.data.data.token,
                    refreshToken: event.data.data.refresh_token
                }));
                console.log('[WORKER] Token refreshed');
            }
        }
    }, 10000);
}

export {
    startAutoRefreshToken,
    stopAutoRefreshToken,
    tokenWorker
}