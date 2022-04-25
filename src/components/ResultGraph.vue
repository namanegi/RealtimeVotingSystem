<template>
	<div id="reslutContainer">
		<div id="curQ">
			<h5>{{ res.question }}</h5>
		</div>
		<div id="barGraph">
			<div class="bar" id="barA"><div class="backBar" :style="'height:' + (hbA + 20) + 'px;'" id="backA"></div></div>
			<div class="bar" id="barB"><div class="backBar" :style="'height:' + (hbB + 20) + 'px;'" id="backB"></div></div>
			<div class="bar" id="barC"><div class="backBar" :style="'height:' + (hbC + 20) + 'px;'" id="backC"></div></div>
			<div class="bar" id="barD"><div class="backBar" :style="'height:' + (hbD + 20) + 'px;'" id="backD"></div></div>
		</div>
		<div id="xLabel">
			<div class="xLabelBox">A</div>
			<div class="xLabelBox">B</div>
			<div class="xLabelBox">C</div>
			<div class="xLabelBox">D</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ResultGraph',
	props: ['res'],
	computed: {
		total() {
			return this.res.ctA + this.res.ctB + this.res.ctC + this.res.ctD
		},
		hbA() {
			return (this.total !== 0) ? ((this.total - this.res.ctA) * 300 / this.total) : 300
		},
		hbB() {
			return (this.total !== 0) ? ((this.total - this.res.ctB) * 300 / this.total) : 300
		},
		hbC() {
			return (this.total !== 0) ? ((this.total - this.res.ctC) * 300 / this.total) : 300
		},
		hbD() {
			return (this.total !== 0) ? ((this.total - this.res.ctD) * 300 / this.total) : 300
		}
	}
}
</script>

<style scoped>
#barGraph {
	background-color: antiquewhite;
	width: 300px;
	height: 320px;
	border: 2px solid black;
	margin: 20px auto 0 auto;
}
#xLabel {
	width: 300px;
	margin: auto;
}
.xLabelBox {
	display: inline-block;
	width: 25%;
}
.bar {
	display: inline-block;
	width: 21%;
	height: 100%;
	background-color: blue;
	margin: 0 2%;
	padding: 0;
}
.backBar {
	width: 100%;
	height: 20%;
	background-color: antiquewhite;
}
</style>