function openModal (event) {
	if (event.target.classList.contains('task__add')) {
		let modal = document.getElementById('modal');
		modal.style.display = "block";	
	}else {
		let modal = document.getElementById('confirmation');
		modal.style.display = "block";
	}
	
	currElem = event.target;
}

function closeModal(index) {
	if (typeof(index) === 'number') {
		let modalActive = document.getElementsByClassName('modal')[index];
		modalActive.style.display = "none";	
	}else{
		let modalActive = index.target.parentNode.parentNode;
		modalActive.style.display = "none";
	}
	
}

function addTask () {
	let titleValue = document.getElementById('title').value
	let subtitleValue = document.getElementById('subtitle').value
	let title = document.createTextNode(titleValue);
	let titleElem = document.createElement('p');
	titleElem.setAttribute('class','task__item-title');
	titleElem.appendChild(title);
	let subtitle = document.createTextNode(subtitleValue);
	let subtitleElem = document.createElement('p');
	subtitleElem.setAttribute('class','task__item-subtitle');
	subtitleElem.appendChild(subtitle);
	let task = document.createElement('div');
	task.setAttribute('class','task__item');
	task.appendChild(titleElem);
	task.appendChild(subtitleElem);
	currElem.parentNode.insertBefore(task,currElem);
	task.addEventListener('click', openModal);
	document.getElementById('title').value = '';
	document.getElementById('subtitle').value = '';
	closeModal(0);
	task.offsetWidth;
	task.classList.add('active');
	countTask ();
}

function removeTask () {
	if (currElem.nodeName == "P") {
		taskTobeRemove = currElem.parentNode;
		taskTobeRemove.classList.remove('active');
		taskTobeRemove.addEventListener('transitionend',function () {
			taskTobeRemove.parentNode.removeChild(taskTobeRemove);
			countTask ();
		})
	}else{
		currElem.classList.remove('active');
		currElem.addEventListener('transitionend',function () {
			currElem.parentNode.removeChild(currElem);
			countTask ();
		})	
	}
	closeModal(1);
	
}

function finishTask () {
	if (currElem.nodeName == "P") {
		taskToBeFinish = currElem.parentNode;
		taskToBeFinish.classList.remove('active');
		taskToBeFinish.addEventListener('transitionend',function () {
			completeTask.appendChild(taskToBeFinish);
			taskToBeFinish.setAttribute('class','task__item active');
			taskToBeFinish.removeEventListener('click',openModal)
			taskToBeFinish.style.cursor = "initial"
		})

	}else{
		currElem.classList.remove('active');
		currElem.addEventListener('transitionend',function () {
			completeTask.appendChild(currElem);
			currElem.setAttribute('class','task__item active');
			currElem.removeEventListener('click',openModal)
			currElem.style.cursor = "initial"
			
		})
	}
	closeModal(1);
	setTimeout(countTask,600);

}
function switchTab () {
	let tab = event.target;
	if (event.target.nodeName == "P") {
		tab = event.target.parentNode;
	}
	if(event.target.nodeName == "SPAN"){
		tab = event.target.parentNode.parentNode;
	}
	if (tab.classList.contains('stat__tab--active')) {
		return
	}

	let tabs = document.querySelectorAll('.stat__tab');
	 tabs.forEach(tab => {
		tab.classList.remove('stat__tab--active');
	})
	let action = document.querySelector('.tab');
	action.classList.toggle('translate'); 	
	tab.classList.add('stat__tab--active');
	
}

function countTask () {
	let created = document.getElementById('created');
	let createdTask = document.querySelectorAll('.task__item').length;
	created.innerHTML = createdTask;

	let completed = document.getElementById('completed');
	let completedTask = document.getElementById('completeTask').children.length;
	completed.innerHTML = completedTask - 1;
}


document.addEventListener('DOMContentLoaded', function  () {
	let plusBtn = document.querySelectorAll('.task__add');
	plusBtn.forEach(btn => {
		btn.addEventListener('click',openModal)
	})	
	let taskItems = document.querySelectorAll('.task__item');
	taskItems.forEach(task => {
		task.addEventListener('click', openModal)
	})
	countTask ();
	add.addEventListener('click',addTask);
	let close = document.querySelectorAll('.close');
	close.forEach(closeBtn => {
		closeBtn.addEventListener('click', closeModal);
	});
	remove.addEventListener('click',removeTask);
	finish.addEventListener('click',finishTask);
	let tab = document.querySelector('.stat');
	tab.addEventListener('click',switchTab)
})
