<!-- Hamburger.svelte -->
<script>
    /**
     * @type {any}
     */
     export let toggle; // This function is passed in to toggle the menu
  </script>
  
  <button on:click={toggle} class="hamburger">
    ☰
  </button>
  
  <style>
    .hamburger {
      background: none;
      border: none;
      font-size: 50px;
      cursor: pointer;
      position: fixed; 
      top: 0; 
      left: 0; 
      z-index: 100;
    }
  </style>
  