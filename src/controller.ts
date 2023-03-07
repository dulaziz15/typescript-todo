import { readFile, writeFile } from 'fs/promises';

// membuat interface Note
interface Note {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export const getAll = async(): Promise<Note[]> => {
    const buffer = await readFile('./notes.json', {
        encoding: 'utf-8'
    })  // mengambil semua data yang ada pada file notes.json dan menampungnya dalama variable buffer
    return JSON.parse(buffer);
}

export const getById = async(id: number): Promise<Note> => {
    const noteList = await getAll();
    const note = noteList.find(note => note.id === id);
    if(note) {
        return note;
    } else {
        throw new Error('tidak ada id');
    }
}

export const create = async(note: Note): Promise<void> => {
    const notelist = await getAll(); // mengambil semua data yang ada pada function getAll() ditampung dalam variable notelist
    await writeFile('./notes.json', JSON.stringify([...notelist, note])); // menulis data yang ada pada variable 
                                                                        //  notelist dan menambahkannya dengan parameter note yang berisi data sesuai dengan interface Note
    console.log("data berhasil dibuat");
}

export const removeById = async(id: number): Promise<void> => {
    const noteList = await getAll(); // mengambil semua data yang ada pada file notes.json
    const note = noteList.filter(note => note.id !== id); // filter data yang tidak sama dengan id dan ditampung dalam variablenote
    await writeFile('./notes.json', JSON.stringify(note)); // menulis data yang ada pada variable note yang telah difilter dan memasukan pada file notes.json
}

export const updatebyId = async(note: Partial<Note>): Promise<void> => {
    if(!note.id) {
        throw new Error('parameter id tidak ada')
    }

    const noteUpdate = await getById(note.id);
    const update = {...noteUpdate, ...note};
    await removeById(note.id);
    await create(update);
}