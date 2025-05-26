const getSessionData = async () => {
    try {
        const response = await fetch('/mapmoo/check_session.php', {
            credentials: 'include'
        });
        if (!response.ok) {
            window.location.href = `/mapmoo/login.php?site=yap`;
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Session check failed:', error);
        window.location.href = `/mapmoo/login.php?site=yap`;
        return null;
    }
};

export const authService = {
    getSessionData
};