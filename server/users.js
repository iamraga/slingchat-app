let users = [];

const addUser = ({ id, name, room, displayName }) => {

    name = name.trim().replace(/ /g, '').toLowerCase();
    room = room.trim().replace(/ /g, '').toLowerCase();

    const existingUser = users.find((user) => (user.room === room && user.name === name));
    if(existingUser) {
        return { error : 'Username is taken'};
    }
    const addedUser = { id, name, displayName, room };
    users.push(addedUser);
    return { addedUser };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => (user.id === id));
    const removedUser = users.splice(index, 1)[0];
    return removedUser;
};

const getUser = (id) => (users.find((user) => user.id === id));

const getUsersInRoom = (room) => (users.filter(user => user.room === room));

module.exports = { addUser, removeUser, getUser, getUsersInRoom };