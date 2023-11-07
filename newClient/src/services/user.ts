export async function createUser(data){
    try {
        const name = data.split(' ')
        const firstName = name[0]
        const lastName = name[name.length - 1]
        const res = await fetch('http://localhost:8000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: data.email,
                firstName: firstName,
                lastName: lastName,
                friends: [] })
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

export async function getUserByEmail(email){
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
            console.log("User Already Exists")
            console.log('in api: ' ,user)
            return user
        } else {
            console.error('Error from backend', res);
            return null
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}