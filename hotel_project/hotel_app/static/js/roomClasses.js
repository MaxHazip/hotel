import roomClasses from "../data/roomsClasses.json" with {type: "json"}

let rooms = roomClasses

const roomsGrid = document.querySelector(".rooms_grid")

const renderRoomsClasses = () => {

    roomsGrid.innerHTML = ""

    for (let i = 0; i < rooms.length; i++) {

        let roomCard = document.createElement("div")
        roomCard.className = "room-card"

        let roomLink = document.createElement("a")
        roomLink.href = `/room_page?id=${rooms[i].id}`

        let roomImage = document.createElement("img")
        roomImage.src = rooms[i].image
        roomImage.className = "room-img"

        roomLink.appendChild(roomImage)

        let mainInformationDiv = document.createElement("div")
        mainInformationDiv.className = "main-information"

        let mainInformationTitle = document.createElement("h2")
        mainInformationTitle.className = "main-information-title"
        mainInformationTitle.textContent = rooms[i].name

        let tagsList = document.createElement("ul")
        tagsList.className = "tags-list"

        let squareMeters = document.createElement("li")
        squareMeters.className = "tags-list-item first"
        squareMeters.innerHTML = `${rooms[i].square}м<sup>2</sup>`

        let bedTypes = document.createElement("li")
        bedTypes.className = "tags-list-item"
        bedTypes.textContent = rooms[i].bedType

        let roomsCount = document.createElement("li")
        roomsCount.className = "tags-list-item"
        roomsCount.textContent = `Rooms: ${rooms[i].roomsCount}`

        let guestsCount = document.createElement("li")
        guestsCount.className = "tags-list-item"
        guestsCount.textContent = `Guests: ${rooms[i].guestNumber}`

        tagsList.appendChild(squareMeters)
        tagsList.appendChild(bedTypes)
        tagsList.appendChild(roomsCount)
        tagsList.appendChild(guestsCount)

        let cardDescription = document.createElement("p")
        cardDescription.className = "description"
        cardDescription.textContent = rooms[i].cardDescription

        mainInformationDiv.appendChild(mainInformationTitle)
        mainInformationDiv.appendChild(tagsList)
        mainInformationDiv.appendChild(cardDescription)

        roomCard.appendChild(roomLink)
        roomCard.appendChild(mainInformationDiv)

        roomsGrid.appendChild(roomCard)

    }

}   

const sortSelect = document.getElementById("sort")

const sortRoomClasses = (sortSelectValue) => {

    switch (sortSelectValue) {

        case "ascPrice":
            rooms.sort((first, second) => first.cost - second.cost)
            break
        case "descPrice":
            rooms.sort((first, second) => second.cost - first.cost)
            break
        case "ascSquare":
            rooms.sort((first, second) => first.square - second.square)
            break
        case "descSquare":
            rooms.sort((first, second) => second.square - first.square)
            break
        case "ascRooms":
            rooms.sort((first, second) => first.roomsCount - second.roomsCount)
            break
        case "descRooms":
            rooms.sort((first, second) => second.roomsCount - first.roomsCount)
            break
        case "ascGuests":
            rooms.sort((first, second) => first.guestNumber - second.guestNumber)
            break
        case "descGuests":
            rooms.sort((first, second) => second.guestNumber - first.guestNumber)
            break

    }

    renderRoomsClasses()

}

sortSelect.onchange = () => {

    let sortSelectValue = sortSelect.value

    sortRoomClasses(sortSelectValue)

}



let sortValue = sortSelect.value

sortRoomClasses(sortValue)

