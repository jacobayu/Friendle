<script>
    let requests = 7; // You can fetch this from a store or an API
  </script>
  
  <style>
    .dashboard {
      width: 200px;
      background-color: #2c3e50;
      color: white;
      padding: 20px;
      border-radius: 10px;
    }
  
    .dashboard h1 {
      font-size: 24px;
      margin-bottom: 30px;
    }
  
    .menu-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
    }
  
    .menu-item:last-child {
      margin-bottom: 0;
    }
  
    .menu-icon {
      margin-right: 10px;
    }
  
    .badge {
      background-color: #e74c3c;
      border-radius: 50%;
      padding: 2px 8px;
      font-size: 14px;
      margin-left: 5px;
    }
  
    .logout {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      padding: 10px;
      background-color: #34495e;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
  
  <div class="dashboard">
    <h1>Jacob Au</h1>
    <div class="menu-item">
      <span class="menu-icon">👥</span>
      Friends
    </div>
    <div class="menu-item">
      <span class="menu-icon">✉️</span>
      Requests
      <span class="badge">{requests}</span>
    </div>
    <div class="menu-item">
      <span class="menu-icon">➕</span>
      Add Friend
    </div>
    <div class="logout">
      Log Out
    </div>
  </div>