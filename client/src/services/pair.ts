const url = import.meta.env.VITE_WEBSITE_URL;

export async function createPair(data: any){
    try {
        const res = await fetch(`${url}/api/pair`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const data = await res.json();
            console.log("successfully created new pair")
            console.log('Pair data:', data); // Handle your response here
            return data
        } else {
            console.error('Error from backend', res);
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}

export async function updatePair(id:string, body: any){
    try{
        const res = await fetch(`${url}/api/pair/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });
            if (res.ok) {
                const data = await res.json();
                console.log("successfully updated pair")
                return data
            } else {
                console.error('Error from backend', res);
            }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}

export async function getPairByUserId(id1:any, id2:any){
    try {
        const res = await fetch(`${url}/api/pair/getByUser?user1=${id1}&user2=${id2}`, {
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