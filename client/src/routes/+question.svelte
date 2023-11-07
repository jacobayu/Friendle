<script>
    // Your script logic will go here.
</script>

<style>
/* Add your styles here */
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #6991c7, #fbc7d4);
}

.question {
    background-color: white;
    padding: 10px 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.player {
    background-color: black;
    color: white;
    padding: 10px 20px;
    margin: 10px;
    border-radius: 20px;
}
</style>

<div class="container">
<div class="question">Question</div>
<div>
    <button class="player">YOU</button>
    <span>VS</span>
    <button class="player">LUCY</button>
</div>
</div>