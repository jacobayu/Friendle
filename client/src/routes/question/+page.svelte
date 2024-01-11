<script>
    import { onMount } from 'svelte';
    import Button from '../../lib/button.svelte'
    import Navbar from '../../lib/nav-bar.svelte';
    let question = "Who is smarter?"

    // onMount(() =>{
    //   user.subscribe((u) => {
    //     user_value = u;
    //   });
    // });

    const onClick = () => {
      console.log("clicked")
    }
</script>
  
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

<Navbar />

<div class="container">
  <div class="header">{question}</div>
  <div class="left-half">
    <Button text="YOU" func={onClick}></Button>
  </div>
  <div class="right-half">
    <Button text="LUCY" func={onClick}></Button>
  </div>  
</div>

  
