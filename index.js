function openModal (event) {
	let modal = document.getElementById('modal')
	modal.style.display = "block";	
	addBtn = event.target;
}

function closeModal() {
	modal.style.display = "none";
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
	addBtn.parentNode.insertBefore(task,addBtn);
	document.getElementById('title').value = '';
	document.getElementById('subtitle').value = '';
	closeModal();
	task.offsetWidth;
	task.classList.add('active');
}

function createdTask () {
	let created = document.getElementById('created');
	let createdTask = document.querySelectorAll('.task__item').length;
	created.innerHTML = createdTask;
}


document.addEventListener('DOMContentLoaded', function  () {
	let plusBtn = document.querySelectorAll('.task__add');
	plusBtn.forEach(btn => {
		btn.addEventListener('click',openModal)
	})
	
	
	

	add.addEventListener('click',addTask);

	let close = document.getElementById('close');
	close.addEventListener('click', closeModal);
})