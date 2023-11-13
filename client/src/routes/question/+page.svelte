<script>
    import { user } from '../../store';
    import { onMount } from 'svelte';
    import Button from '../../lib/button.svelte'

    let user_value = {}
    onMount(() =>{
      user.subscribe((u) => {
      user_value = u;
      });
    });

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
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f8;
    }
  
    .header {
      background-color: white;
      padding: 10px 20px;
      margin-bottom: 20px;
      font-size: 24px;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .match-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e8e8e8;
      padding: 20px;
      border-radius: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    } 
  
    .vs {
      margin: 0 20px;
      color: #333;
      font-size: 24px;
    }
  
    .half-background {
      background: linear-gradient(to right, #3b8ef3 50%, #fff168 50%);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
    }
  </style>
  
  <div class="half-background"></div>
  <div class="container">
    <div class="header">Question</div>
    <div class="match-container">
      <Button text="You" func={onClick}></Button>
      <div class="vs">VS</div>
      <Button text="Lucy" func={onClick}></Button>
    </div>
  </div>