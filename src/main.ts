import { getAll, getById, create, removeById, updatebyId } from "./controller"

const run = async() => {
    await updatebyId({id: 1, title: "bangun"});
    const data = await getAll();
    console.log(data);
}

run();