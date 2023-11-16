<script>
  import { user } from "../store";
  import { onMount } from 'svelte';
  import Hamburger from './hamburger.svelte';
  import AddFriendModal from './addFriend.svelte';

  let requests = 7; // You can fetch this from a store or an API
  $: user_value = $user;
  let showMenu = false;
  let showAddFriend = false;

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

  onMount(() =>{
    // user.subscribe((u) => {
    //   user_value = $u;
    //   console.log(user_value)
    // });
    window.addEventListener('click', handleClickOutside);

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
    }
  }

  console.log(user_value)
</script>
  
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
  </style>


  <Hamburger toggle={toggleMenu} />

{#if showAddFriend}
  <AddFriendModal on:close={closeAddFriend} />
{/if}

  {#if showMenu}
    <div class="dashboard">
        <div class="menu-item">
            <span class="menu-icon"><img src="/profile.svg" alt="profile"/></span>
            {user_value.firstName} {user_value.lastName}
        </div>
        <div class="menu-item">
          <span class="menu-icon"><img src="/friend.svg" alt="profile"/></span>
          Friends
        </div>
        <div class="menu-item">
          <span class="menu-icon"><img src="/mail.svg" alt="mail"/></span>
          Requests
          <span class="badge">{requests}</span>
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
