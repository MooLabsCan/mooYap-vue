const getSessionData = async () => {
    try {
        const response = await fetch('/check_session.php', {
            credentials: 'include'
        });
        if (!response.ok) {
            window.location.href = `https://liap.ca/login.php?site=yap`;
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Session check failed:', error);
        window.location.href = `https://liap.ca/login.php?site=yap`;
        return null;
    }
};

export const authService = {
    getSessionData
};