import roomClasses from "../data/roomsClasses.json" with {type: "json"}

let rooms = roomClasses

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const roomIndex = rooms.findIndex(room => room.id === Number(id))

const renderRoom = () => {

    let image = document.getElementById("main-image")
    let square = document.getElementById("squareMeters")
    let guestsCount = document.getElementById("guestsCount")
    let bedsCount = document.getElementById("bedsCount")
    let roomsCount = document.getElementById("roomsCount")
    let descritption = document.getElementById("description")
    let roomCost = document.getElementById("roomCost")
    let bookButton = document.getElementById("book")

    image.src = rooms[roomIndex].image
    square.innerHTML = `${rooms[roomIndex].square}м<sup>2</sup>`
    guestsCount.textContent = `Guests number: ${rooms[roomIndex].guestNumber}`
    bedsCount.textContent = `Beds number: ${rooms[roomIndex].bedsCount} ${ rooms[roomIndex].bedType }`
    roomsCount.textContent = `Rooms number: ${rooms[roomIndex].roomsCount}`
    descritption.textContent = rooms[roomIndex].roomDescription
    roomCost.textContent = `${rooms[roomIndex].cost}$`
    bookButton.href = `/booking?id=${rooms[roomIndex].id}`

}

renderRoom()