<!-- <svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import {jwtDecode} from 'jwt-decode';
    import {createUser, getUserByEmail} from '../services/user'
    import dotenv from "dotenv"
    dotenv.config()
    const googleClientId = process.env.GOOGLE_CLIENT_ID
    console.log("here")
    console.log(googleClientId)
    onMount(async() => {
        console.log('bruh')
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        window.handleCredentialResponse = async(response) => {
            console.log("Encoded JWT ID token: " + response);
            const decoded = jwtDecode(response.credential)
            console.log(decoded)
            const user = await getUserByEmail(decoded.email)
            if(user.length){
                console.log('user already exists')
            }
            else{
                await createUser(decoded)
            }
        }
    })
</script>

<div id="g_id_onload"
    data-client_id={googleClientId}
    data-callback="handleCredentialResponse"
    data-auto_prompt="false">
</div>
<div class="g_id_signin" data-type="standard"></div> -->
<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;; // Replace with your client ID
      console.log(clientId)
      if (typeof window !== 'undefined') {
        window.google?.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse
        });
  
        window.google?.accounts.id.renderButton(
          document.getElementById('buttonDiv'),
          { theme: 'outline', size: 'large' }  // customization attributes
        );
      }
    });
  
    function handleCredentialResponse(response) {
      console.log('Encoded JWT ID token: ' + response.credential);
      // TODO: Send this response.credential (JWT token) to your backend to create a session or authenticate the user.
    }
  </script>
  
  <div id="buttonDiv"></div>