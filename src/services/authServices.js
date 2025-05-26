const getSessionData = async () => {
    try {
        const response = await fetch('https://liap.ca/check_session.php', {
            credentials: 'include'
        });
        if (!response.ok) {
            window.location.href = `https://liap.ca/login.php?site=yap-v`;
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Session check failed:', error);
        window.location.href = `https://liap.ca/login.php?site=yap-v`;
        return null;
    }
};

export const authService = {
    getSessionData
};