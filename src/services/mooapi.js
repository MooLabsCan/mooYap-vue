export async function loginUser(mat) {
    try {
        const response = await fetch('http://liap.ca/LiaBack/api/users/read.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mat })
        });
        const myValue = localStorage.getItem("mooToken");
        console.log(myValue);
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
