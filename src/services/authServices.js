const getSessionData = async () => {
    try {
        const response = await fetch('https://liap.ca/api/check_session.php', {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        setTimeout( () => {
            if (!response.ok) {
                window.location.href = `https://liap.ca/login.php?site=yap-v`;
                return null;
            }
        }, 10000)

        return await response.json();
    } catch (error) {
        console.error('Session check failed:', error);
       // window.location.href = `https://liap.ca/login.php?site=yap-v`;
        return null;
    }
};

export const authService = {
    getSessionData
};