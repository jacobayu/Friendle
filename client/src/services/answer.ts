const url = import.meta.env.VITE_WEBSITE_URL;


export async function createAnswer(data: any){
    try {
        const res = await fetch(`${url}/api/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            const data = await res.json();
            console.log("successfully created new answer: ", data)
            return data
        } else {
            console.error('Error from backend', res);
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}

export async function getAnswerByPair(userId: any, pairId:any, questionId: any){
    try {
        const res = await fetch(`${url}/api/answer/query?userID=${userId}&pairID=${pairId}&questionID=${questionId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const answer = await res.json();
            return answer
        } else {
            console.error('Error from backend', res);
            return null
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}