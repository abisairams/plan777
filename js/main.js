(async function() {

    const output = document.getElementById('output')
    const database = await getDB()
    const baseSettedByUser = await localStorage.getItem('base')

    const base = {
        bookId: parseInt(database[26 - 1].id),
        bookChapterDay: 28,
        boookChapters: database[26 - 1].chapters,
        date: new Date('jan 17 2021')
    }

    if (baseSettedByUser) {
        db = JSON.parse(baseSettedByUser)

        base.bookId = db.book.id,
        base.bookChapterDay = parseInt(db.book.chapter),
        base.date = new Date(db.date)
    }

    const currentChapter = {
        bookId: base.bookId,
        bookChapterDay: base.bookChapterDay,
        date: new Date()
    }

    const diffInDays = Math.floor((currentChapter.date - base.date) / 86400000)

    function calculate(diffInDays) {
        const currentBook = database[currentChapter.bookId - 1]

        if (diffInDays + base.bookChapterDay < currentBook.chapters) {
            currentChapter.bookChapterDay = diffInDays + parseInt(base.bookChapterDay)
            currentChapter.boookName = currentBook.name
            return currentChapter
        }

        diffInDays -= currentBook.chapters
        currentChapter.bookId++
        
        calculate(diffInDays)
    }



    calculate(diffInDays)



    output.innerText = `${currentChapter.boookName}  ${currentChapter.bookChapterDay}`

    if (output.innerText.length > 15) {
        output.innerText = `${currentChapter.boookName.slice(0,10)}...  ${currentChapter.bookChapterDay}`
        output.classList.add('small')
    };


    if (!localStorage.getItem('base')) {
        console.log(0)
    };

    setInterval(function (e) {
        location.reload()
    },200000)

})()