import createStore from './createStore';
import reducer from './reducer';

const store = createStore(reducer);

window.onload = function() {
	document.querySelector('.view-stub__apply').addEventListener('click', function() { sendToServer(); });
	store.addEventListener(render);
}

function sendToServer() {
	const input = document.querySelector('.view-stub__input').value;
	store.dispatch({ type: 'SEND_DATA', payload: input });
}

const render = () => {
	const state = store.getState();
	const logList = document.querySelector('.log');

	document.querySelector('.view-stub__input').value = '';
	document.querySelector('.view-stub__label').innerText = state.response;

	// Да, дорого, но по условию мы обходимся без ShadowDOM
	while(logList.firstChild) {
    	logList.removeChild(logList.firstChild);
	}

	state.sentData.forEach(data => {
		const node = document.createElement("li");
		const text = document.createTextNode(data);
		node.appendChild(text);
		logList.appendChild(node);
	})
}