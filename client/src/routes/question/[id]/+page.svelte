<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import Button from '../../../lib/button.svelte'
    import Navbar from '../../../lib/nav-bar.svelte';
    import { page } from '$app/stores';
    import { getUser } from '../../../services/user';
    import { userStore } from '../../../store';
    import { getPairByUserId, updatePair } from '../../../services/pair';
    import { createAnswer, getAnswerByPair } from '../../../services/answer';
    import { getTodaysQuestion }  from '../../../services/question';
    import CorrectModal from '$lib/correct-modal.svelte';
    import PendingModal from '$lib/pending-modal.svelte';
    import IncorrectModal from '$lib/incorrect-modal.svelte';

    /**
     * @type {string}
     */
    let friendId;
    let pair;
    $: friendId = $page.params.id;
    let friend;
    let question;
    let showPending = false;
    let showCorrect = false;
    let showIncorrect = false;
    let youButtonClicked = false;
    let youButtonDisabled = false;
    let friendButtonClicked = false;
    let friendButtonDisabled = false;
    let isClientSide = false;

    async function chooseSelf(){
        youButtonDisabled=true;
        friendButtonDisabled=true;
        youButtonClicked=true;
        const answerBody = {
            userID: $userStore._id,
            questionID: question._id,
            pairID: pair._id,
            answer:$userStore._id,
        }
        const answer = await createAnswer(answerBody);
        let friendAnswer = await getAnswerByPair(friend._id, pair._id, question._id);
        if(friendAnswer.length > 0){
            friendAnswer = friendAnswer[0]
            if(friendAnswer.answer == answer.answer){
                const newPairBody = {
                    currentScore: pair.currentScore + 1,
                    highScore: Math.max(pair.currentScore + 1, pair.highScore)
                }
                pair = await updatePair(pair._id, newPairBody)
                showCorrect = true
            }
            else{
                const newPairBody = {
                    currentScore: 0
                }
                pair = await updatePair(pair._id, newPairBody)
                showIncorrect = true
            }
        }
        else{
            showPending = true
        }
    }

    async function chooseFriend(){
        youButtonDisabled=true;
        friendButtonDisabled=true;
        friendButtonClicked=true;
        const answerBody = {
            userID: $userStore._id,
            questionID: question._id,
            pairID: pair._id,
            answer:friend._id,
        }
        const answer = await createAnswer(answerBody);
        let friendAnswer = await getAnswerByPair(friend._id, pair._id, question._id);
        if(friendAnswer.length > 0){
            friendAnswer = friendAnswer[0]
            if(friendAnswer.answer == answer.answer){
                const newPairBody = {
                    currentScore: pair.currentScore + 1,
                    highScore: Math.max(pair.currentScore + 1, pair.highScore)
                }
                pair = await updatePair(pair._id, newPairBody)
                showCorrect = true
            }
            else{
                const newPairBody = {
                    currentScore: 0
                }
                pair = await updatePair(pair._id, newPairBody)
                showIncorrect = true
            }
        }
        else{
            showPending = true
        }
    }

    async function onChangeFriend() {
        if (!isClientSide || !$userStore._id) {
            return;
        }
        showPending = false;
        showCorrect = false;
        showIncorrect = false;
        friendButtonClicked = false;
        youButtonClicked = false;
        friendButtonDisabled = false;
        youButtonDisabled = false;

        friend = await getUser(friendId)
        pair = await getPairByUserId(friendId, $userStore._id);
        pair = pair[0]
        let answer = await getAnswerByPair($userStore._id, pair._id, question._id)
        console.log(answer)
        if(answer.length > 0){
            answer = answer[0]
            youButtonDisabled=true;
            friendButtonDisabled=true;
            if(answer.answer == friend._id){
                friendButtonClicked = true;
            }
            else{
                youButtonClicked = true;
            }
            let friendAnswer = await getAnswerByPair(friend._id, pair._id, question._id)
            if(friendAnswer.length > 0){
                friendAnswer = friendAnswer[0]
                if(answer.answer == friendAnswer.answer){
                    showCorrect=true
                }
                else{
                    showIncorrect=true
                }
            }
            else{
                showPending=true
            }
        }
    }

    $: if(friendId && isClientSide) {
        onChangeFriend();
    }

    onMount(async() => {
        userStore.useLocalStorage();
        isClientSide = true;
        onChangeFriend()
        question = await getTodaysQuestion();
        console.log(question)
    })
</script>

<Navbar />
{#if showIncorrect}
    <IncorrectModal currentStreak={pair.currentScore} maxStreak={pair.highScore}/>
{/if}

{#if showPending}
    <PendingModal currentStreak={pair.currentScore} maxStreak={pair.highScore}/>
{/if}

{#if showCorrect}
    <CorrectModal currentStreak={pair.currentScore} maxStreak={pair.highScore}/>
{/if}

{#if friend && question}
<div class="container">
  <div class="header">{question.question}</div>
  <div class="left-half">
    <Button 
        text="YOU" 
        func={chooseSelf} 
        disabled={youButtonDisabled} 
        clicked={youButtonClicked}>
    </Button>
  </div>
  <div class="right-half">
    <Button 
        text={friend.firstName.toUpperCase()} 
        func={chooseFriend} 
        disabled={friendButtonDisabled} 
        clicked={friendButtonClicked}>
    </Button>
  </div>  
</div>
{/if}

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  .container {
    position: relative; /* This will be the anchor for the absolute positioning of header */
    height: 100vh; /* Adjust height as needed */
  }

  .header {
    position: absolute;
    top: 10%; /* Adjust this value to position the header as desired */
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    padding: 20px 20px;
    font-size: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 10;
    width:60%;
  }

  .left-half, .right-half {
    width: 50%;
    height: 100%;
    position: fixed; /* Keeps divs full height even when scrolling */
    display: flex; /* Enables flexbox */
    justify-content: center; /* Centers horizontally */
    align-items: center;
  }

  .left-half {
    left: 0;
    background-color: #8DA5E2; /* Replace with your preferred color */
  }

  .right-half {
    right: 0;
    background-color: #FFF6A1; /* Replace with your preferred color */
  } 
</style>