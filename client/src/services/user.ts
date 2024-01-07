export async function createUser(data: any){
    try {
        const res = await fetch('http://localhost:8000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const data = await res.json();
            console.log("successfully created new user")
            console.log('User data:', data); // Handle your response here
        } else {
            console.error('Error from backend', res);
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
};

export async function getUserByEmail(email:any){
    try {
        console.log(email)
        const res = await fetch(`http://localhost:8000/api/user/query?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const user = await res.json();
            return user
        } else {
            console.error('Error from backend', res);
            return null
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}