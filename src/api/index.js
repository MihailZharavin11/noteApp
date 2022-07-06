import axios from 'axios';
import {
    v4
} from 'uuid';

const api = axios.create({
    baseURL: 'http://localhost:3001'
})


const createFolder = async (title) => {
    const newFolder = {
        id: v4(),
        title
    }
    await api.post('/pages', newFolder)

    return newFolder
}

const deleteFolder = async (id) => {
    await api.delete(`/pages/${id}`)
}

const createNote = async (title, text, direction) => {
    const todayDate = new Date().toLocaleDateString();
    const newNote = {
        id: v4(),
        title,
        text,
        direction: direction ? direction : 'allnotes',
        date: todayDate
    }
    await api.post('/posts', newNote)
    return newNote
}

const deleteNote = async (id) => {
    await api.delete(`/posts/${id}`)
}

const changeNote = async (id, title, text, direction, date) => {
    const newChangesNote = {
        id,
        title,
        text,
        direction: direction ? direction : 'allnotes',
        date
    }
    await api.put(`/posts/${id}`, newChangesNote)

    return newChangesNote
}

const changeDirectionOnNote = async (id, newDirectionElement) => {
    await api.put(`/posts/${id}`, newDirectionElement)
}

const changeFolderName = async (titleId, newTitleName) => {
    await api.put(`/pages/${titleId}`, newTitleName)
}

const getAllNotes = async () => {
    const {
        data
    } = await api.get('/posts')
    return data
}

const getAllFolders = async () => {
    const {
        data
    } = await api.get('/pages')
    return data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createFolder,
    createNote,
    deleteNote,
    changeNote,
    deleteFolder,
    changeDirectionOnNote,
    changeFolderName,
    getAllNotes,
    getAllFolders
}