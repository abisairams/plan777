const form = document.settings
const chapterOptions = form.chapters
const bookOptions = form.books
const dayOptions = form.days
const monthOptions = form.months
const yearOptions = form.years
const overlay = document.getElementById('overlay')
const months = [
	{id: 1, name: 'Enero', days: 31},
	{id: 2, name: 'Febrero', days: 29},
	{id: 3, name: 'Marzo', days: 30},
	{id: 4, name: 'Abril', days: 31},
	{id: 5, name: 'Mayo', days: 31},
	{id: 6, name: 'Junio', days: 30},
	{id: 7, name: 'Julio', days: 31},
	{id: 8, name: 'Agosto', days: 31},
	{id: 9, name: 'Septiembre', days: 30},
	{id: 10, name: 'Octubre', days: 31},
	{id: 11, name: 'Noviembre', days: 30},
	{id: 12, name: 'Diciembre', days: 31},

]

async function getDB() {
    return await (await fetch('./db/books.json')).json()
}

function validateFormValues() {
	const formData = new FormData(form)
	return new Promise(function(resolve, reject) {
		const res = {
			empty: [],
			filled: []
		}
		formData.forEach(function (e, i, o) {
			if (!e) {
				res.empty.push(i)
				console.log(i, 'is empty')
			} else {
				res.filled.push(i)
			}
		})
		if (res.empty.length > 0) {
			alert('Faltan algunos datos. \nRevise su información agregada.')
			resolve(false)
		} else {
			resolve(true)
		}
	})
}

async function main(e) {
	const database = await getDB()
	
	fillParentOptionsElem(months, monthOptions, 'Meses');
	fillParentOptionsElem(database, bookOptions, 'Libros')
}

function fillParentOptionsElem(db, parent, customText) {
	parent.innerHTML = ''
	let tempElem = `<option value="">${customText}</option>`
	if (typeof db === 'number') {
		let counter = 1;
		while(counter <= db) {
			tempElem += `<option value="${counter}">${counter}</option>`
			counter++
		}
		parent.innerHTML += tempElem
		return
	}
	

	db.forEach(function (reg) {
		tempElem += `<option value="${reg.id || reg.name}">${reg.name}</option>`
	})
	parent.innerHTML += tempElem
}

async function fillChaptersOptionElem(e) {
	const database = await getDB()
	const bookId = e.target.value
	const bookSelectedByUser = database[bookId - 1]
	const bookChapters = parseInt(bookSelectedByUser.chapters)
	fillParentOptionsElem(bookChapters, chapterOptions, 'Capitulos')
}
function fillDaysOptionElem(e) {
	const monthId = e.target.value
	const monthSelectByUser = months[monthId - 1]
	console.log(monthSelectByUser)
	const monthDays = parseInt(monthSelectByUser.days)
	fillParentOptionsElem(monthDays, dayOptions, 'Dias')
}

async function saveSettings(e) {
	e.preventDefault()
	const isValidFormData = await validateFormValues()
	if (isValidFormData) {
		const data = {
			date: new Date(`${monthOptions.value} ${dayOptions.value} ${yearOptions.value}`),
			book: {id: bookOptions.value, chapter: chapterOptions.value} 
		}
		localStorage.setItem('base', JSON.stringify(data))
		if (localStorage.getItem('base') != '') {
			overlay.setAttribute('hidden', true)
		};
	}
}

main()
if (!localStorage.getItem('base')) {
	overlay.removeAttribute('hidden')
};
// localStorage.removeItem('base')
monthOptions.addEventListener('change', fillDaysOptionElem, false)
bookOptions.addEventListener('change', fillChaptersOptionElem, false)
form.addEventListener('submit', saveSettings, false)