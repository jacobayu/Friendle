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

    async function chooseSelf(){
        const answerBody = {
            userID: $userStore._id,
            questionID: question._id,
            pairID: pair._id,
            answer:$userStore.firstName,
        }
        const answer = await createAnswer(answerBody);
        let friendAnswer = await getAnswerByPair(friend._id, pair._id);
        if(friendAnswer.length > 0){
            friendAnswer = friendAnswer[0]
            if(friendAnswer.answer == answer.answer){
                const newPairBody = {
                    currentScore: pair.currentScore + 1,
                    maxScore: max(pair.currentScore + 1, pair.highScore)
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
        const answerBody = {
            userID: $userStore._id,
            questionID: question._id,
            pairID: pair._id,
            answer:friend.firstName,
        }
        const answer = await createAnswer(answerBody);
        let friendAnswer = await getAnswerByPair(friend._id, pair._id);
        if(friendAnswer.length > 0){
            friendAnswer = friendAnswer[0]
            if(friendAnswer.answer == answer.answer){
                const newPairBody = {
                    currentScore: pair.currentScore + 1,
                    maxScore: max(pair.currentScore + 1, pair.highScore)
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
        friend = await getUser(friendId)
        pair = await getPairByUserId(friendId, $userStore._id);
    }

    $: friendId, onChangeFriend()

    onMount(async() => {
        userStore.useLocalStorage();
        onChangeFriend()
        question = await getTodaysQuestion();
        console.log(question)
    })
</script>

<Navbar />
{#if showCorrect}
    <IncorrectModal currentStreak={pair.currentScore} maxStreak={pair.highScore}/>
{/if}

{#if showPending}
    <PendingModal currentStreak={pair.currentScore} maxStreak={pair.highScore}/>
{/if}

{#if showIncorrect}
    <CorrectModal currentStreak={pair.currentScore} maxStreak={pair.highScore}/>
{/if}

{#if friend && question}
<div class="container">
  <div class="header">{question.question}</div>
  <div class="left-half">
    <Button text="YOU" func={chooseSelf}></Button>
  </div>
  <div class="right-half">
    <Button text={friend.firstName.toUpperCase()} func={chooseFriend}></Button>
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

  
