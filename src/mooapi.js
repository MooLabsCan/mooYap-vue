export async function loginUser(email, pw) {
    try {
        const response = await fetch('http://localhost/LiaBack/api/users/read.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, pw })
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
}
