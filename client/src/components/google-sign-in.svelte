<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<script>
    import {jwtDecode} from 'jwt-decode';
    import {createUser, getUserByEmail} from '../../services/user'
    const googleClientId = process.env.GOOGLE_CLIENT_ID

    window.handleCredentialResponse = async(response) => {
        console.log("Encoded JWT ID token: " + response);
        const decoded = jwtDecode(response.credential)
        console.log(decoded)
        user = await getUserByEmail(decoded.email)
        if(user.length){
            console.log('user already exists')
        }
        else{
            await createUser(decoded)
        }
    // Send this response.credential (JWT ID token) to your backend for verification and further processing
    }
</script>
<div id="g_id_onload"
    data-client_id={googleClientId}
    data-callback="handleCredentialResponse"
    data-auto_prompt="false">
</div>
<div class="g_id_signin" data-type="standard"></div>
