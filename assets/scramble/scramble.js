// scramble.js
//
// 2011, Jeff Donahue (http://jeffdonahue.com/).
// license: you can use this if you want to i guess
// ------
// changes: removed initial scrambling of initScrambledString

function scrambledString(tag, objName, initScrambledString, initScrambledStringIndices) {
	this.tag = tag;
	this.objName = objName;
	this.string = initScrambledString;
	this.indices = initScrambledStringIndices;
	this.initAnimatedBubbleSort = initAnimatedBubbleSort;
	this.bubbleSortStep = bubbleSortStep;
	this.bubbleSortBookmark = 0;

	this.tag.innerHTML = this.string + ' <a href="#" onClick="' + this.objName + '.initAnimatedBubbleSort();return false;">unscramble</a>';
}

function initAnimatedBubbleSort() {
	this.interval = setInterval(this.objName + '.bubbleSortStep()', 12);
}

function bubbleSortStep() {
	if (this.bubbleSortBookmark >= this.indices.length - 1) {
		this.bubbleSortBookmark = 0;
	}
	for (i = this.bubbleSortBookmark; i < this.indices.length - 1; i++) {
		if (i == 0) {
			this.changed = 0;
		}
		if (this.indices[i] > this.indices[i + 1]) {
			this.changed = 1;
			tempIndex = this.indices[i];
			this.indices[i] = this.indices[i + 1];
			this.indices[i + 1] = tempIndex;
			tempArrange = this.string.substring(0, i) +
				this.string.substring(i + 1, i + 2) +
				this.string.substring(i, i + 1) +
				this.string.substring(i + 2);
			this.string = tempArrange;
			this.tag.innerHTML = this.string;
			this.bubbleSortBookmark = i;
			break;
		}
	}
	this.bubbleSortBookmark = i;
	if (!this.changed) {
		clearInterval(this.interval);
	}
}
