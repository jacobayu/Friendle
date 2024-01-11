<script>
  import { onMount } from 'svelte';
  import {createUser, getUserByEmail} from '../services/user'
  import {jwtDecode} from 'jwt-decode';
  import { userStore } from '../store'
	import { onDestroy } from 'svelte'
  import { goto } from '$app/navigation';


  /**
     * @type {any}
  */

  let user_value;
  let unsubscribe = userStore.set(null);

  onMount(() => {
    // user.subscribe((u) => {
    //   user_value = u;
    //   if (user_value) {
    //     goto('/question');
    //   }
    // });
    userStore.useLocalStorage();
    
    // if($userStore) {
    //   goto('/question');
    // }

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Replace with your client ID
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

  /**
   * @param {{ credential: any; }} response
   */
  async function handleCredentialResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    const decoded = jwtDecode(response.credential)
      console.log(decoded)
      const fetchedUser = await getUserByEmail(decoded.email)
      if(fetchedUser.length > 0){
          console.log('user already exists')
          $userStore = { // Corrected store update
            email: fetchedUser[0].email,
            firstName: fetchedUser[0].firstName,
            lastName: fetchedUser[0].lastName,
            friends: fetchedUser[0].friends
          };
          console.log(user_value)
          goto('/question')
      }
      else{
        console.log("creating user")
        const info = {
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          email: decoded.email,
          friends:[]
        }
        await createUser(info)
        // user.update((u) => u = JSON.stringify({ firstName: decoded.given_name,
        //   lastName: decoded.family_name,
        //   email: decoded.email,
        //   friends:[] }))
        $userStore = { // Corrected store update
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          email: decoded.email,
          friends: []
        };
        goto('/question')
      }
  }

</script>

<div id="buttonDiv"></div>