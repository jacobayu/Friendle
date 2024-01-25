<script>
// @ts-nocheck
    import { userStore } from "../store";

    userStore.useLocalStorage();

    export let open = true;
    export let currentStreak;
    export let maxStreak;
  
    function closeModal() {
      open=false
    }

    function stopPropagation(event) {
        event.stopPropagation();
    }

  // Function to handle backdrop click to close the modal
    function handleBackdropClick() {
        open=false;
    }

  </script>
{#if open}
    <div class="modal" on:click={handleBackdropClick}>
        <div class="modal-content" on:click={stopPropagation}>
            <button class="close-button" on:click={closeModal} aria-label="Close modal">+</button>
            <div class="modal-header">
                <h2>CORRECT!</h2>
            </div>
            <div class="modal-body">
                <div class="current-body">
                    <div class="current-streak">{currentStreak}</div>
                    <div class="current-label">CURRENT</div>
                    <div class="current-label">STREAK</div>
                </div>
                <div class="divider"></div>
                <div class="max-body">
                    <div class="max-streak">{maxStreak}</div>
                    <div class="max-label">MAX</div>
                    <div class="max-label">STREAK</div>
                </div> 
            </div>
        </div>
    </div>
{/if}
  
<style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
  
    .modal-content {
      position: relative;
      background: #D1ffD0;
      padding: 40px 50px;
      border-radius: 10px;
      text-align: center;
    }
  
    .close-button {
        cursor: pointer;
        position:absolute;
        padding: 10px;
        top: -5px;
        right: 0px;
        font-size: 32px;
        transform: rotate(45deg);
        border: none;
        background: transparent;
        color:black
    }
    
    .close-button:hover,
    .close-button:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }

    .current-body, .max-body{
        display: flex;
        flex-direction: column;
    }

    .max-body{
        margin-left:40px;
    }

    .current-body{
        margin-right:40px;
    }

    .modal-header{
        font-size: 30px;
    }

    .modal-body {
        padding: 2px 40px;
        display:flex;
        align-items: center;
    }

    .current-label, .max-label {
        font-size: 20px;
    }

    .current-streak, .max-streak {
        font-size: 80px;
        font-weight: 600;
    }

    .divider {
        background-color: #000; /* Color of the divider line */
        width: 3px !important; /* Thickness of the line */
        height: 150px;
        margin-top: 10px;
    }
</style>
  