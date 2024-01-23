<script>
// @ts-nocheck

  import { userStore } from "../store";
  import { goto } from '$app/navigation';
  import { updateFriendRequest } from "../services/request";
  import { addFriend } from "../services/user";
  import { createPair } from "../services/pair";
  import { onMount } from 'svelte';

  export let requests;

  /**
     * @param {string} requestId
     * @param {string} friendId
     */
  async function friendAccept(requestId, friendId) {
    const id = $userStore._id 
    await updateFriendRequest(requestId, "accepted");
    await addFriend(id, friendId);
    $userStore.friends = (await addFriend(friendId, id)).friends;
    const pair = {  
      users: [$userStore._id, friendId],
      currentScore:0,
      maxScore:0
    };
    await createPair(pair);
    requests = requests.filter(request => request._id !== requestId);
    event.stopPropagation();
  }

  /**
     * @param {string} requestId
     * @param {string} friendId
     */
  async function friendReject(requestId, friendId) {
    await updateFriendRequest(requestId, "declined");
    requests = requests.filter(request => request._id !== requestId);
    event.stopPropagation();
  }

  onMount(async () =>{
    userStore.useLocalStorage();
  });
</script>

<div class="dashboard">
    {#each requests as request}
      <div class="request-item">
        <div>
          {request.fromUser.firstName} {request.fromUser.lastName}
        </div>
        <div class="request-row">
          <div id="friend-X" on:click={() => friendReject(request._id, request.fromUser._id)}><img src="/x.svg" alt="X"/></div>
          <div id="friend-check" on:click={() => friendAccept(request._id, request.fromUser._id)}><img src="/checkmark.svg" alt="checkmark"/></div>
        </div>
      </div>
    {/each}
  </div>

<style>
    .dashboard {
        position: fixed; /* or 'absolute' if you want it to move with the page scroll */
        top: 0; /* Adjust if you need some space from the top of the viewport */
        left: 0; /* Align to the left side of the viewport */
        z-index: 1000; /* A high value to ensure it's above other content */
        width: 25%; /* Or '200px' if you want to maintain the original width */
        height:100%;
        background-color: #2c3e50;
        color: white;
        padding: 20px;
        transition: transform 0.7s ease;
        font-size: 40px;
        /* Start off-screen to the left */
    }

    .dashboard.show {
        transform: translateX(0);
    }
    .request-item {
        display: flex;
        border-bottom: 1px solid white; /* Adds a white line below each item */
        padding-bottom: 20px;   
        padding-top: 10px;
        padding-left: 20px;
        padding-right: 20px;
        margin-top:10px;
        margin-bottom: 10px;
        vertical-align: middle;
        flex-direction: column;  
    /* justify-content: start; */
    }

    .request-row{
        display:flex;
    }

    #friend-X, #friend-check {
        display:flex;
        padding: 20px 20px;
        border-color: black;
        border-width: 3px;
        border-radius: 10px;
        color: white;
        font-size: 40px;
        transition: background-color 0.3s ease;
        width:30%;
        height:15px !important;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
        margin:5px;
    }

    #friend-X {
        background-color: #E76767;
    }

    #friend-X:hover {
    /* background-color: #EF8989; */
        background-color: #B54747;
    }

    #friend-X:active {
    /* background-color: #EF8989; */
        background-color: darkred ;
    }

    #friend-check {
        background-color: #AAFCBC;
    }

    #friend-check:hover {
        background-color: #70C28C;
    }

    #friend-check:active{
        background-color: #457552;
    }

    #friend-X img, #friend-check img{
        width: 20px; /* Adjust the width as needed */
        height: auto; /* Keeps the aspect ratio of the image */
        vertical-align: middle;
    }
</style>