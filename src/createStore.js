
export default (_reducer, _state) => {
	if(!_reducer || !typeof _reducer === 'function') throw new Error('reducer должен быть и должен быть функцией!');
	if(!typeof _state === 'object') throw new Error('state должен быть объектом!');

	const reducer = _reducer;
	
	let state = _state || {};
	let eventListeners = [];
	
	const getState = () => state;

	const addEventListener = eL => { eventListeners.push(eL); }

	const dispatch = action => {
		console.log(`Dispatch события ${action.type}. Данные: ${action.payload}`)

		if(!action || !(typeof action === 'object')) return;
		state = reducer(state, action);
		eventListeners.forEach(eL => { 
			eL(); 
			console.log('Регистрация ивента');
		})
	};

	return {
		getState,
		addEventListener,
		dispatch
	};
};

