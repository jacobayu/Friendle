<script>
    import { goto } from '$app/navigation';

    /**
     * @type {any}
     */
     export let friends;

    /**
     * @param {string} friendId
     */
    function selectFriend(friendId){
        goto(`/question/${friendId}`);
    }

</script>
<div class="dashboard">
    {#each friends as friend}
      <div class="menu-item" on:click={() => selectFriend(friend._id)}>
        <div>
          {friend.firstName} {friend.lastName}
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
      /* border-bottom: none;  */
    }
  </style>