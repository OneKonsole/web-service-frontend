import {callRefreshToken} from "@utils/auth.ts";

let timerId: string | number | NodeJS.Timeout | null | undefined = null;

self.addEventListener('message', (e) => {
    console.log("[WORKER] Received message:", e.data.message);
    switch (e.data.message) {
        case 'start':
            if (timerId === null) { // Start only if not already started
                console.log("[WORKER] Starting refresh token worker");
                timerId = setInterval(() => {
                    console.log("Refreshing token...");
                    callRefreshToken({refreshToken: e.data.refreshToken})
                        .then((response) => {
                            self.postMessage(response);
                        }).catch((error) => {
                        self.postMessage(error);
                    });
                }, 120000); // 2 minutes
            }
            break;
        case 'stop':
            console.log("[WORKER] Stopping refresh token worker");
            if (timerId !== null) {
                clearInterval(timerId);
                timerId = null;
            }
            break;
    }
}, false);
