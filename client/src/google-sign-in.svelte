<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<script>
    const googleClientId = process.env.GOOGLE_CLIENT_ID

    window.handleCredentialResponse = (response) => {
        console.log("Encoded JWT ID token: " + response);
    // Send this response.credential (JWT ID token) to your backend for verification and further processing
    }
</script>
<div id="g_id_onload"
    data-client_id={googleClientId}
    data-callback="handleCredentialResponse">
</div>
<div class="g_id_signin" data-type="standard"></div>
