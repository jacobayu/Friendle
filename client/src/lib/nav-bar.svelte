<script>
  import { userStore } from "../store";
  import { onMount } from 'svelte';
  import Hamburger from './hamburger.svelte';
  import AddFriendModal from './addFriend.svelte';
  import { goto } from '$app/navigation';
  import { getPendingFriendRequests } from "../services/request";


  // TODO You can fetch this from a store or an API
  let showMenu = false;
  let showAddFriend = false;
  let showRequests = false;
  /**
     * @type {string | any[]}
     */
  let requests = [];

  function openRequests() {
    showRequests = true
  }

  async function getRequests(){
    const email = $userStore.email 
    const pendingRequests = await getPendingFriendRequests(email)
    console.log(pendingRequests)
    if (pendingRequests){
      requests = pendingRequests
    }
  }

  async function friendAccept() {
    event.stopPropagation();
  }

  async function friendReject() {
    event.stopPropagation();
    
  }

  function openAddFriend() {
    showAddFriend = true;
    console.log(showAddFriend)
  }

  function closeAddFriend() {
    showAddFriend = false;
  }

  function toggleMenu() {
      event.stopPropagation(); 
      showMenu = true;
  }

  onMount(async () =>{
    userStore.useLocalStorage();
    
    if($userStore == null || $userStore == {}){
      console.log('bruh')
      goto('/sign-in')
    }
    window.addEventListener('click', handleClickOutside);

    await getRequests(); 

    return () => {
      // Remove event listener when the component is destroyed
      window.removeEventListener('click', handleClickOutside);
    };
  });

  /**
     * @param {{ target: Node | null; }} event
     */
  function handleClickOutside(event) {
    // Obtain a reference to the navbar element
    const navbar = document.querySelector('.dashboard');

    // If the click is outside the navbar and the navbar is shown, close it
    if (navbar && !navbar.contains(event.target) && showMenu) {
      showMenu = false;
      showRequests = false;
    }
  }

</script>
  
<Hamburger toggle={toggleMenu} />

{#if showAddFriend}
  <AddFriendModal on:close={closeAddFriend} />
{/if}

{#if showMenu && $userStore}
  <div class="dashboard">
      <div class="menu-item">
          <span class="menu-icon"><img src="/profile.svg" alt="profile"/></span>
          {$userStore.firstName} {$userStore.lastName}
      </div>
      <div class="menu-item">
        <span class="menu-icon"><img src="/friend.svg" alt="profile"/></span>
        Friends
      </div>
      <div class="menu-item" on:click={openRequests}>
        <span class="menu-icon"><img src="/mail.svg" alt="mail"/></span>
        Requests
        <span class="badge">{requests.length}</span>
      </div>
      <div class="menu-item" on:click={openAddFriend}>
        <span class="menu-icon"><img src="/addFriend.svg" alt="addFriend"/></span>
        Add Friend
      </div>
      <div class="menu-item">
          <span class="menu-icon"><img src="/out.svg" alt="logOut"/></span>
          Log Out
      </div>
  </div>
{/if}

{#if showMenu && $userStore && showRequests}
  <div class="dashboard">
    {#each requests as request}
      <div class="request-item">
        <div>
          {request.firstName} {request.lastName}
        </div>
        <div class="request-row">
          <div id="friend-X" on:click={friendReject}><img src="/x.svg" alt="X"/></div>
          <div id="friend-check" on:click={friendAccept}><img src="/checkmark.svg" alt="checkmark"/></div>
        </div>
      </div>
    {/each}
  </div>
{/if}

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

  .menu-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid white; /* Adds a white line below each item */
    padding-bottom: 20px;   
    padding-top: 10px;
    margin-top:10px;
    margin-bottom: 10px;
    vertical-align: middle;
  }

  .menu-item:last-child {
    margin-bottom: 0;
    border-bottom: none; /* Removes the line from the last item */
  }

  .badge {
    background-color: #e74c3c;
    border-radius: 50%;
    padding: 2px 8px;
    font-size: 20px;
    margin-left: 5px;
  }

.menu-icon img {
  height: 1em; /* Sets the icon size to match the text size */
  width: 1em; /* Keeps the icon aspect ratio */
  vertical-align: middle; /* Aligns the icon vertically with the text */
  margin-right: 10px;
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