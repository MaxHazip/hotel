import roomClasses from "../data/roomsClasses.json" with {type: "json"}

import { Storage } from "./storage.js";

let rooms = roomClasses

let storage = new Storage()

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

const submitButton = document.getElementById("bookingButton")
const checkInInput = document.getElementById("checkInDate")
const checkOutInput = document.getElementById("checkOutDate")
const guestsCount = document.getElementById("guestsCount")
const lastName = document.getElementById("lastName")
const firstName = document.getElementById("firstName")
const middleName = document.getElementById("middleName")
const phoneNumber = document.getElementById("phoneNumber")
const email = document.getElementById("email")

const renderDateInputs = () => {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowYear = tomorrow.getFullYear();
    const tomorrowMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const tomorrowDay = String(tomorrow.getDate()).padStart(2, '0');
    const tomorrowStr = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

    checkInInput.min = todayStr
    checkOutInput.min = tomorrowStr

    checkInInput.value = todayStr
    checkOutInput.value = tomorrowStr

}

renderDateInputs()

const checkDate = (checkInDate, checkOutDate, roomClass) => {

    let bookings = storage.getBookings()

    return bookings.some(book => {

        return book.class === roomClass &&
               checkInDate < book.checkOut &&
               checkOutDate > book.checkIn

    })

}

const formValidation = (guestsCountValue, checkInValue, checkOutValue, lastNameValue, firstNameValue, phoneNumberValue, emailValue) => {

    if (Number(guestsCountValue) > rooms[roomIndex].guestNumber || Number(guestsCountValue) < 1) {

        document.getElementById("alert").textContent = "Недопустимое количество человек"

        return false

    }

    if (checkInValue.trim().length == 0 || checkOutValue.trim().length == 0) {

        document.getElementById("alert").textContent = "Неверно указана дата"
        return false

    }

    if (checkDate(checkInValue, checkOutValue, rooms[roomIndex].name)) {

        document.getElementById("alert").textContent = "Дата занята"
        return false

    }

    if (guestsCountValue.trim().length == 0) {

        document.getElementById("alert").textContent = "Введите количество гостей" 
        return false

    } 

    if (lastNameValue.trim().length == 0) {

        document.getElementById("alert").textContent = "Введите фамилию" 
        return false

    } 

    if (firstNameValue.trim().length == 0) {

        document.getElementById("alert").textContent = "Введите имя" 
        return false

    } 

    if (phoneNumberValue.trim().length == 0 && emailValue.trim().length == 0) {

        document.getElementById("alert").textContent = "Введите телефон или email" 
        return false

    }

    const phoneDigits = phoneNumberValue.replace(/\D/g, '');
    const isValidPhone = (phoneDigits.length === 11 && /^[78]/.test(phoneDigits)) ||
                        (phoneDigits.length === 10 && /^9/.test(phoneDigits));
    if (!isValidPhone) {
        document.getElementById("alert").textContent = "Введите корректный номер телефона (10 или 11 цифр, начинающийся с 9, 8 или 7)";
        return false;
    }

    const emailPattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    if (emailValue.trim().length > 0 && !emailPattern.test(emailValue.trim())) {
        document.getElementById("alert").textContent = "Введите корректный email";
        return false;
    }

    if (checkOutValue <= checkInValue) {
        document.getElementById("alert").textContent = "Дата выезда должна быть позже даты заезда";
        return false;
    }

    return true

}

submitButton.addEventListener("click", () => {

    let bookings = storage.getBookings()

    let checkInValue = checkInInput.value
    let checkOutValue = checkOutInput.value
    let guestsCountValue = guestsCount.value
    let lastNameValue = lastName.value
    let firstNameValue = firstName.value
    let middleNameValue = middleName.value
    let phoneNumberValue = phoneNumber.value
    let emailValue = email.value 

    let isValid = formValidation(guestsCountValue, checkInValue, checkOutValue, lastNameValue, firstNameValue, phoneNumberValue, emailValue)

    if (!isValid) return

    const book = {

        "id": bookings.length + 1,
        "checkIn": checkInValue,
        "checkOut": checkOutValue,
        "guests": guestsCountValue,
        "lastName": lastNameValue,
        "firstName": firstNameValue,
        "middleName": middleNameValue,
        "phoneNumber": phoneNumberValue,
        "email": emailValue,
        "class": rooms[roomIndex].name

    }

    storage.saveNewBook(book)

    window.location.href = "/rooms"

    alert("Успешное бронирование")

}) 