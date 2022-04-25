<template>
  <div id="teacher">
    <result-graph v-bind:res="curQues" v-if="renderGraph"></result-graph>
    <div id="setQuestion">
      <form name="form">
        <div id="questionBody">
          <textarea 
            style="width: 500px;height: 100px;display: block;margin: auto;"
            type="text"
            id="inputQ"
            v-model="questionBody.question"
          >
          </textarea>
          <label for="opA">A: </label><input type="text" name="opA" v-model="questionBody.opA" id="opA" />
          <label for="opB">B: </label><input type="text" name="opB" v-model="questionBody.opB" id="opB" />
          <label for="opC">C: </label><input type="text" name="opC" v-model="questionBody.opC" id="opC" />
          <label for="opD">D: </label><input type="text" name="opD" v-model="questionBody.opD" id="opD" />
        </div>
        <div id="submitContainer">
          <button
            type="button"
            @click="handleSubmit"
          >
            確認
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import ResultGraph from './ResultGraph.vue'

let socket = new WebSocket('ws://192.168.1.81:5001')

export default {
  name: 'Teacher',
  components: {
    ResultGraph
  },
  data() {
    return {
      questionBody: {
        question: '',
        opA: "",
        opB: "",
        opC: "",
        opD: ""
      },
      curQues: {
        question: '',
        ctA: 0,
        ctB: 0,
        ctC: 0,
        ctD: 0
      },
      renderGraph: false
    }
  },
  mounted() {
    socket.onopen = () => {
      socket.send(JSON.stringify({
        type: 'initial',
        message: 'teacher'
      }))
    }
    socket.onmessage = event => {
      // console.log(event.data)
      let messageParsed = JSON.parse(event.data)
      if (messageParsed.type === 'resBroadcast') {
        this.renderGraph = false
        this.curQues = messageParsed.message
        this.renderGraph = true
      }
      else if (messageParsed.type === 'curQuestion') {
        this.renderGraph = false
        this.curQues = messageParsed.message
        this.renderGraph = true
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log(this.questionBody)
      socket.send(JSON.stringify({
        type: 'questionSubmit',
        message: {
          ...this.questionBody,
          ctA: 0,
          ctB: 0,
          ctC: 0,
          ctD: 0
        }
      }))
    }
  }
}
</script>

<style scoped>

</style>