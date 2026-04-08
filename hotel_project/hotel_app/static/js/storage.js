let bookings = [
    {
        "id": 1,
        "checkIn": "2026-04-08",
        "checkOut": "2026-04-15",
        "guests": 2,
        "lastName": "Азимутов",
        "firstName": "Виктор",
        "middleName": "Викторович",
        "phoneNumber": "+7(982)323-32-32",
        "email": "bober@mail.ru",
        "class": "Lux"
    }
]

export class Storage {

    saveBookings = (currentBookings) => {

        localStorage.setItem("bookings", JSON.stringify(currentBookings))

    }

    getBookings = () => {

        if (localStorage.getItem("bookings")) {

            return JSON.parse(localStorage.getItem("bookings"))

        } else {

            this.saveBookings(bookings)

            return bookings

        }

    }

    saveNewBook = (book) => {

        let currentBookings = this.getBookings()

        currentBookings.push(book)

        this.saveBookings(currentBookings)

    }

}