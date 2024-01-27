<script>
    import GoogleSignIn from "$lib/google-sign-in.svelte";
</script>
<div class="container">
    <div class="group">
        <h1>Friendle.</h1>
        <GoogleSignIn/>
    </div>
</div>



<style>
    .group {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 80vh;
    }

    h1{
        font-size: 100px;
    }

    .container {
        background-color: #FFF6A1;
        height: 100vh;
    }
</style>