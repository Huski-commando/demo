const fs = require('fs')
const chalk = require('chalk')
const { timeLog, Console } = require('console')

//Adding note command
const addNote = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNotes = notes.find((note) => note.title === title)
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Notes title taken!'))
    }
}

// Remove note command 
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }

}

//List command
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes!'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

//ReadNotes command
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.inverse.red('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}