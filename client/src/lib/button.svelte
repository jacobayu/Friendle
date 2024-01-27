<script>
    // You can add your JavaScript logic here
    export let text = "";
    export let func = () => {};
    export let disabled = false;
    export let clicked = false;
    function handleClick() {
        func(); // Call the passed onClick function
        clicked = true; // Set the clicked state to true
    }
</script>
  
  <style>
    .custom-button {
      padding: 20px 20px;
      background-color: black;
      border: none;
      border-radius: 10px;
      color: white;
      font-size: 40px;
      transition: background-color 0.3s ease;
      box-shadow: 5px 5px 4px 0px rgba(0, 0, 0, 0.25);
      width:50%;
    }
  
    .custom-button:hover {
      background-color: white;
      color:black;
    }
  
    .custom-button:active {
      background-color: navy;
    }


    .custom-button:disabled {
      background-color: black;
      color:white;
    }

    .clicked {
        box-shadow: 0 0 100px #2dbc55;
        background-color: white !important;
        color:black !important;
    }
  </style>
  
  <button class="custom-button {clicked ? 'clicked' : ''}" on:click={handleClick} disabled={disabled}>
    {text}
  </button>
  