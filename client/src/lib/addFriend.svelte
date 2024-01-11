<script>
    import { createEventDispatcher } from 'svelte';
    import { sendRequest } from '../services/request';
    import { userStore } from "../store";

    userStore.useLocalStorage();

    const dispatch = createEventDispatcher();
    let email = '';
  
    function closeModal() {
      dispatch('close');
    }
  
    async function addFriend() {
      // Here you would have your logic to add a friend by email
      // For example:
      // addFriendByEmail(email).then(() => closeModal());
      const friendRequest = await sendRequest(email, $userStore.email);
      if(friendRequest == undefined){
        alert("Email not found with an account")
        return
      }
      alert("friend request successfully sent")
      closeModal();
    }

    function stopPropagation(event) {
        event.stopPropagation();
    }

  // Function to handle backdrop click to close the modal
    function handleBackdropClick() {
        closeModal();
    }

  </script>
  
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
      background: white;
      padding: 40px;
      border-radius: 5px;
      width: 300px;
      text-align: center;
    }
  
    .close-button {
        cursor: pointer;
        position:absolute;
        padding: 10px;
        top: -5px;
        right: 0px;
        font-size: 24px;
        transform: rotate(45deg);
        border: none;
        background: transparent;
        color:black
    }
  
    input {
      margin-bottom: 20px;
      width: calc(100% - 20px);
      padding: 10px;
      border-radius: 4px;
      border: 1px solid black;
    }
  
    button {
      padding: 10px 20px;
      border: none;
      background-color: #2c3e50;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    #addFriendButton:hover {
      background-color: #8DA5E2;
      color:white;
    }
  
    #addFriendButton:disabled {
      background-color: #ccc;
    }

    h2{
        font-size: 40px;
    }
  </style>
  
  <div class="modal" on:click={handleBackdropClick}>
    <div class="modal-content" on:click={stopPropagation}>
      <button class="close-button" on:click={closeModal} aria-label="Close modal">+</button>
      <h2>ADD FRIEND</h2>
      <input type="email" placeholder="Friend's email" bind:value={email} />
      <button id="addFriendButton" on:click={addFriend} disabled={!email}>Add Friend</button>
    </div>
  </div>