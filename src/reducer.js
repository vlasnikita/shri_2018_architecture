export default (state, action) => {
	console.log('Reducer обновляет state');
	let newState = state;
	switch(action.type){
		case 'SEND_DATA':
		newState.sentData = newState.sentData ? [...newState.sentData, action.payload] : [action.payload];
		newState.response = `Данные "${action.payload}" успешно отправлены`;
		return newState;
	}
}