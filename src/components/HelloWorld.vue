<template>
  <div class="hello">
    <result-graph v-bind:res="curQues" v-if="renderGraph"></result-graph>
    <div id="voteContainer" v-if="renderVote">
      <div class="voteBox"><button id="voteA" @click="vote(curQues.opA)">{{curQues.opA}}</button></div>
      <div class="voteBox"><button id="voteB" @click="vote(curQues.opB)">{{curQues.opB}}</button></div>
      <div class="voteBox"><button id="voteC" @click="vote(curQues.opC)">{{curQues.opC}}</button></div>
      <div class="voteBox"><button id="voteD" @click="vote(curQues.opD)">{{curQues.opD}}</button></div>
    </div>
  </div>
</template>

<script>
import ResultGraph from './ResultGraph.vue';

let socket = new WebSocket('ws://192.168.1.81:5001')

export default {
  components: { ResultGraph },
  name: 'Student',
  data() {
    return {
      curQues: {
        question: '',
        ctA: 0,
        ctB: 0,
        ctC: 0,
        ctD: 0,
        opA: "",
        opB: "",
        opC: "",
        opD: ""
      },
      renderGraph: false,
      renderVote: false
    }
  },
  mounted() {
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'initial',
        message: 'student'
      }))
    }
    socket.onmessage = event => {
      let messageParsed = JSON.parse(event.data)
      console.log(messageParsed)
      if (messageParsed.type === 'curQuestion' || messageParsed.type === 'resBroadcast' ) {
        this.renderGraph = false
        this.curQues = messageParsed.message
        this.renderGraph = true
        if (messageParsed.message.question !== '問題を設置するまでお待ちください') {
          this.renderVote = true
        }
      }
    }
  },
  methods: {
    vote(val) {
      this.renderGraph = false
      socket.send(JSON.stringify({
        type: 'vote',
        message: val
      }))
      this.renderGraph = true
    }
  }
}
</script>

<style>
#voteContainer {
  display: block;
  width: 300px;
  height: 20px;
  margin: 10px auto;
}
.voteBox {
  display: inline-block;
  width: 25%;
  height: 100%;
  margin: 0;
}
</style>