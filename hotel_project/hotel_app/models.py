from django.db import models

# Create your models here.

class EventStatuses(models.Model):
    name = models.CharField('Статус', max_length=40, unique=True)

    class Meta:
        verbose_name = 'Статус события'
        verbose_name_plural = 'Статусы событий'

    def __str__(self):
        return f"{self.name}"

class EventTypes(models.Model):
    name = models.CharField('Тип', max_length=40, unique=True)

    class Meta:
        verbose_name = 'Тип события'
        verbose_name_plural = 'Типы событий'

    def __str__(self):
        return f"{self.name}"

class Organizers(models.Model):
    name = models.CharField('Имя организатора', max_length=40, unique=True)

    class Meta:
        verbose_name = 'Организатор'
        verbose_name_plural = 'Организаторы'

    def __str__(self):
        return f"{self.name}"

class Events(models.Model):
    name = models.CharField('Название события', max_length=50)
    start_date = models.DateField('Дата начала')
    start_time = models.TimeField('Время начала')
    end_date = models.DateField('Дата завершения')
    end_time = models.TimeField('Время завершения')
    organizer_id = models.ForeignKey(Organizers, verbose_name='id Организаторов', on_delete=models.CASCADE)
    event_type_id = models.ForeignKey(EventTypes, verbose_name='id Типа события', on_delete=models.CASCADE)
    event_status_id = models.ForeignKey(EventStatuses, verbose_name='id Статуса события', on_delete=models.CASCADE)
    cost = models.DecimalField('Общая цена', max_digits=20, decimal_places=2)

    class Meta:
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

    def __str__(self):
        return f"{self.name}"

class RoomStatuses(models.Model):
    name_of_status = models.CharField('Статус комнаты', max_length=30, unique=True)

    class Meta:
        verbose_name = 'Статус номера'
        verbose_name_plural = 'Статусы номера'

    def __str__(self):
        return f"{self.name_of_status}"

class RoomClasses(models.Model):
    name_of_class = models.CharField('Класс комнаты', max_length=40, unique=True)
    number_of_beds = models.IntegerField('Количество мест')
    cost = models.DecimalField('Стоимость', max_digits=30, decimal_places=2)

    class Meta:
        verbose_name = 'Класс номера'
        verbose_name_plural = 'Классы номера'

    def __str__(self):
        return f"{self.name_of_class}"

class HotelRooms(models.Model):
    class_name_id = models.ForeignKey(RoomClasses, verbose_name='id Класса номера', on_delete=models.CASCADE)
    room_status_id = models.ForeignKey(RoomStatuses, verbose_name='id Статуса номера', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Номер'
        verbose_name_plural = 'Номера'

    def __str__(self):
        return f"{self.id}"


class Clients(models.Model):
    first_name = models.CharField('Имя', max_length=25, default='Null')
    last_name = models.CharField('Фамилия', max_length=25, default='Null')
    middle_name = models.CharField('Отчество', max_length=25, default='Null')
    birth_date = models.DateField('Дата рождения')
    phone_number = models.CharField('Номер телефона', max_length=40, unique=True, default='Null')
    email = models.CharField('Эдектронная почта', max_length=40, unique=True, default='Null')
    passport_number = models.CharField('Номер паспорта', max_length=30, unique=True)
    hotel_room_id = models.ForeignKey(HotelRooms, verbose_name='id Комнат', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class ClientsAtTheEvent(models.Model):
    event_id = models.ForeignKey(Events, verbose_name='id Событий', on_delete=models.CASCADE)
    client_id = models.ForeignKey(Clients, verbose_name='id Клиента', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Клиент на событии'
        verbose_name_plural = 'Клиенты на событиях'

    def __str__(self):
        return f"{self.id}"

class Dishes(models.Model):
    name = models.CharField('Название блюда', max_length=30, unique=True)
    cost = models.DecimalField('Цена', max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = 'Блюдо'
        verbose_name_plural = 'Блюда'

    def __str__(self):
        return f"{self.name}"

class Posts(models.Model):
    name = models.CharField('Название должности', max_length=40, unique=True)
    salary = models.DecimalField('Оклад', max_digits=30, decimal_places=2)

    class Meta:
        verbose_name = 'Должность'
        verbose_name_plural = 'Должности'

    def __str__(self):
        return f"{self.name}"

class Employee(models.Model):
    first_name = models.CharField('Имя', max_length=25, default='Null')
    last_name = models.CharField('Фамилия', max_length=25, default='Null')
    middle_name = models.CharField('Отчество', max_length=25, default='Null')
    post_id = models.ForeignKey(Posts, verbose_name='id Должностей', on_delete=models.CASCADE)
    birth_date = models.DateField('Дата рождения')
    passport = models.CharField('Паспротные данные', max_length=40, unique=True)
    phone_number = models.CharField('Номер телефона', max_length=40, unique=True, default='Null')
    email = models.CharField('Эдектронная почта', max_length=40, unique=True, default='Null')
    hiring_date = models.DateField('Дата приема на работу')

    class Meta:
        verbose_name = 'Работник'
        verbose_name_plural = 'Работники'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class ServiceTypes(models.Model):
    name = models.CharField('Тип услуги', max_length=30, unique=True)

    class Meta:
        verbose_name = 'Тип услуги'
        verbose_name_plural = 'Типы услуг'

    def __str__(self):
        return f"{self.name}"

class Services(models.Model):
    name = models.CharField('Название услуги', max_length=30, unique=True, default='Null')
    service_type_id = models.ForeignKey(ServiceTypes, verbose_name='id Типа услуги', on_delete=models.CASCADE)
    cost = models.DecimalField('Стоимость услуги', max_digits=30, decimal_places=2)

    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'

    def __str__(self):
        return f"{self.name}"

class ProvisionOfService(models.Model):
    service_id = models.ForeignKey(Services, verbose_name='id Услуги', on_delete=models.CASCADE)
    employee_id = models.ForeignKey(Employee, verbose_name='id Работника', on_delete=models.CASCADE)
    client_id = models.ForeignKey(Clients, verbose_name='id Клиента', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Работник к услуге'
        verbose_name_plural = 'Работники к услугам'

    def __str__(self):
        return f"{self.id}"

class RoomBooking(models.Model):
     hotel_room_id = models.ForeignKey(HotelRooms, verbose_name='id Номера', on_delete=models.CASCADE)
     client_id = models.ForeignKey(Clients, verbose_name='id Клиента', on_delete=models.CASCADE)
     booking_date = models.DateField('Дата бронирования')

     class Meta:
        verbose_name = 'Бронь номера'
        verbose_name_plural = 'Бронь номеров'

     def __str__(self):
        return f"{self.id}"

class RoomService(models.Model):
    hotel_room_id = models.ForeignKey(HotelRooms, verbose_name='id Номера', on_delete=models.CASCADE)
    dish_id = models.ForeignKey(Dishes, verbose_name='id Блюда', on_delete=models.CASCADE)
    amount = models.IntegerField('Количество')

    class Meta:
        verbose_name = 'Блюдо в номер'
        verbose_name_plural = 'Блюда в номер'

    def __str__(self):
        return f"{self.id}"