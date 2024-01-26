export async function createAnswer(data: any){
    try {
        const res = await fetch('http://localhost:8000/api/answer', {
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