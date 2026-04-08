import roomClasses from "../data/roomsClasses.json" with {type: "json"}

let rooms = roomClasses

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const roomIndex = rooms.findIndex(room => room.id === Number(id))

let roomImage = document.querySelector(".roomImage")
let roomName = document.querySelector(".roomName")
let square = document.getElementById("square")
let bedType = document.getElementById("bedType")
let roomsCount = document.getElementById("roomsCount")
let guestNumber = document.getElementById("guestNumber")
let roomDescription = document.getElementById("roomDescription")
let price = document.getElementById("price")

const renderRoomCard = () => {

    roomImage.style.backgroundImage = `url(${rooms[roomIndex].image})`
    roomName.textContent = rooms[roomIndex].name
    square.innerHTML = `${rooms[roomIndex].square}м<sup>2</sup>`
    bedType.textContent = rooms[roomIndex].bedType
    roomsCount.textContent = `Rooms: ${rooms[roomIndex].bedsCount}`
    guestNumber.textContent = `Guests: ${rooms[roomIndex].guestNumber}`
    roomDescription.textContent = rooms[roomIndex].cardDescription
    price.textContent = `${rooms[roomIndex].cost}$`

}

renderRoomCard()