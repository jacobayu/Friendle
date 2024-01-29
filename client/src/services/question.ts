const url = import.meta.env.WEBSITE_URL;

export async function getTodaysQuestion(){
    try {
        const res = await fetch(`${url}/api/question/today`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            const question = await res.json();
            return question
        } else {
            console.error('Error from backend', res);
            return null
        }
    } catch (error) {
        console.error('Error sending token to backend', error);
    }
}