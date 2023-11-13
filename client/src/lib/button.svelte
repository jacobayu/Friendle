<script>
    // You can add your JavaScript logic here
    export let text = "";
    export let func = () => {};
    let isClicked = false;
    function handleClick() {
        func(); // Call the passed onClick function
        isClicked = true; // Set the clicked state to true
    }
</script>
  
  <style>
    .custom-button {
      padding: 20px 20px;
      background-color: black;
      border: none;
      border-radius: 10px;
      color: white;
      font-size: 20px;
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

    .clicked {
        box-shadow: 0 0 20px #4F9A64;
        background-color: white;
        color:black;
    }
  </style>
  
  <button class="custom-button {isClicked ? 'clicked' : ''}" on:click={handleClick}>
    {text}
  </button>
  