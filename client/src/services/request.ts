import { getUserByEmail } from "./user";
export async function sendRequest(to: any, from:any){
    try {
        let toUser = await getUserByEmail(to);
        let fromUser = await getUserByEmail(from)
        console.log(toUser)
        console.log(fromUser)
        if(toUser.length == 0){
            alert("An account with that email does not exist")
            return undefined
        }
        toUser = toUser[0]
        fromUser = fromUser[0]
        if(toUser._id in fromUser.friends){
            alert("You are already friends with this user")
            return undefined
        }
        const body = {
            fromID: fromUser._id,
            toID: toUser._id,
            status:"pending",
            dateSend: Date.now(),
            dateResponded: undefined
        }
        const res = await fetch('http://localhost:8000/api/friendRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            const data = await res.json();
            console.log("successfully sent request")
            console.log('reqest data:', data); // Handle your response here
        } else {
            console.error('Error from backend', res);
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
};

export async function getFriendRequests(email:any){
    try {
        const user = await getUserByEmail(email)
        const res = await fetch(`http://localhost:8000/api/friendRequest/query?email=${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const requests = await res.json();
            return requests
        } else {
            console.error('Error from backend', res);
            return null
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}

export async function updateFriendRequests(id:any, status:string){
    const body = {
        status: status,
        dateResponded: Date.now()
    }
    try {
        const res = await fetch(`http://localhost:8000/api/friendRequest/query?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            const requests = await res.json();
            return requests
        } else {
            console.error('Error from backend', res);
            return null
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}