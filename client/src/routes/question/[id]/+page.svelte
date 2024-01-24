<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import Button from '../../../lib/button.svelte'
    import Navbar from '../../../lib/nav-bar.svelte';
    import { page } from '$app/stores';
    import { getUser } from '../../../services/user';
    import { userStore } from '../../../store';
    import { getPairByUserId } from '../../../services/pair';
    import { getTodaysQuestion }  from '../../../services/question';

    /**
     * @type {string}
     */
    let friendId;
    let pair;
    $: friendId = $page.params.id;

    let friend;

    let question;

    const chooseSelf = () => {
      console.log("clicked")
    }

    const chooseFriend = () => {
      console.log("clicked")
    }

    onMount(async() => {
        userStore.useLocalStorage();
        console.log(friendId)
        friend = await getUser(friendId)
        console.log(friend)
        question = await getTodaysQuestion();
        console.log(question)
    })
</script>

<Navbar />
{#if friend && question}
<div class="container">
  <div class="header">{question.question}</div>
  <div class="left-half">
    <Button text="YOU" func={chooseSelf}></Button>
  </div>
  <div class="right-half">
    <Button text={friend.firstName.toUpperCase()} func={chooseFriend}></Button>
  </div>  
</div>
{/if}
<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  .container {
    position: relative; /* This will be the anchor for the absolute positioning of header */
    height: 100vh; /* Adjust height as needed */
  }

  .header {
    position: absolute;
    top: 10%; /* Adjust this value to position the header as desired */
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    padding: 20px 20px;
    font-size: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 10;
    width:60%;
  }

  .left-half, .right-half {
    width: 50%;
    height: 100%;
    position: fixed; /* Keeps divs full height even when scrolling */
    display: flex; /* Enables flexbox */
    justify-content: center; /* Centers horizontally */
    align-items: center;
  }

  .left-half {
    left: 0;
    background-color: #8DA5E2; /* Replace with your preferred color */
  }

  .right-half {
    right: 0;
    background-color: #FFF6A1; /* Replace with your preferred color */
  } 
</style>

  
