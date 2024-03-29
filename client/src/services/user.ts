
const url = import.meta.env.VITE_WEBSITE_URL;

export async function createUser(data: any){
    try {
        const res = await fetch(`${url}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const data = await res.json();
            return data
        } else {
            console.error('Error from backend', res);
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}

export async function getUser(id:any){
    try {
        const res = await fetch(`${url}/api/user/${id}`, {
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

export async function getUserByEmail(email:any){
    try {
        const res = await fetch(`${url}/api/user/query?email=${email}`, {
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

export async function addFriend(to: any, from: any){
    try {
        const toUser = await getUser(to);
        const fromUser = await getUser(from);
        const newFriendsTo = fromUser.friends 
        newFriendsTo.push(toUser._id)
        const body = {
            friends: newFriendsTo
        }

        const res = await fetch(`${url}/api/user/${fromUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
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