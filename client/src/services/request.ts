import { getUserByEmail } from "./user";
export async function sendRequest(to: any, from:any){
    try {
        const toUser = await getUserByEmail(to);
        const fromUser = await getUserByEmail(from)
        console.log(toUser)
        console.log(fromUser)
        if(toUser.length == 0){
            return undefined
        }
        const body = {
            fromID: fromUser._id,
            toID: toUser._id,
            status:"pending",
            dateSend: Date.now(),
            dateResponded: undefined
        }
        const res = await fetch('http://localhost:8000/api/request', {
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