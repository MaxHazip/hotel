import rooomClasses from "../data/roomsClasses.json" with {type: "json"}

const roomsGrid = document.querySelector(".rooms_grid")

const renderRoomsClasses = () => {

    for (let i = 0; i < rooomClasses.length; i++) {

        let roomCard = document.createElement("div")
        roomCard.className = "room-card"

        let roomLink = document.createElement("a")
        roomLink.href = `/room_page?id=${rooomClasses[i].id}`

        let roomImage = document.createElement("img")
        roomImage.src = rooomClasses[i].image
        roomImage.className = "room-img"

        roomLink.appendChild(roomImage)

        let mainInformationDiv = document.createElement("div")
        mainInformationDiv.className = "main-information"

        let mainInformationTitle = document.createElement("h2")
        mainInformationTitle.className = "main-information-title"
        mainInformationTitle.textContent = rooomClasses[i].name

        let tagsList = document.createElement("ul")
        tagsList.className = "tags-list"

        let squareMeters = document.createElement("li")
        squareMeters.className = "tags-list-item first"
        squareMeters.innerHTML = `${rooomClasses[i].square}м<sup>2</sup>`

        let bedTypes = document.createElement("li")
        bedTypes.className = "tags-list-item"
        bedTypes.textContent = rooomClasses[i].bedType

        let roomsCount = document.createElement("li")
        roomsCount.className = "tags-list-item"
        roomsCount.textContent = `Rooms: ${rooomClasses[i].roomsCount}`

        let guestsCount = document.createElement("li")
        guestsCount.className = "tags-list-item"
        guestsCount.textContent = `Guests: ${rooomClasses[i].guestNumber}`

        tagsList.appendChild(squareMeters)
        tagsList.appendChild(bedTypes)
        tagsList.appendChild(roomsCount)
        tagsList.appendChild(guestsCount)

        let cardDescription = document.createElement("p")
        cardDescription.className = "description"
        cardDescription.textContent = rooomClasses[i].cardDescription

        mainInformationDiv.appendChild(mainInformationTitle)
        mainInformationDiv.appendChild(tagsList)
        mainInformationDiv.appendChild(cardDescription)

        roomCard.appendChild(roomLink)
        roomCard.appendChild(mainInformationDiv)

        roomsGrid.appendChild(roomCard)

    }

}   

renderRoomsClasses()

const sortRoomClasses = () => {

    

}