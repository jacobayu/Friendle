import { getUserByEmail, getUser } from "./user";
const url = import.meta.env.VITE_WEBSITE_URL;


export async function sendRequest(to: any, from:any){
    try {
        let toUser = await getUserByEmail(to);
        let fromUser = await getUserByEmail(from);
        if(toUser.length == 0){
            alert("An account with that email does not exist")
            return undefined
        }
        toUser = toUser[0]
        fromUser = fromUser[0]
        console.log(toUser._id)
        console.log(fromUser.friends)
        if(fromUser.friends.includes(toUser._id)){
            alert("You are already friends with this user")
            return undefined
        }
        let requests = await getPendingFriendRequests(fromUser._id)
        console.log(requests)
        let requestExists = false
        if(requests.length > 0){
            requests.array.forEach((request: any) => {
                if(request.toID == toUser._id){
                    requestExists = true;
                }
            });
        }
        if(requestExists){
            alert("You have already sent this user a friend request")
            return undefined
        }
        const body = {
            fromID: fromUser._id,
            toID: toUser._id,
            status:"pending",
            dateSend: Date.now(),
            dateResponded: undefined
        }
        const res = await fetch(`${url}/api/friendRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            const data = await res.json();
            console.log('reqest data:', data); // Handle your response here
            return data
        } else {
            console.error('Error from backend', res);
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}


export async function getPendingFriendRequests(id:any){
    try {
        const res = await fetch(`${url}/api/friendRequest/query?toID=${id}&status=pending`, {
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

export async function updateFriendRequest(id:any, status:string){
    const body = {
        status: status,
        dateResponded: Date.now()
    }
    try {
        const res = await fetch(`${url}/api/friendRequest/${id}`, {
            method: 'PUT',
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