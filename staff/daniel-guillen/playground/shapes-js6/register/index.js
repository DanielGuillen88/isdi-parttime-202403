if (logic.isUserLoggedIn())
    location.href = '../home'

const view = new Component(document.body)
view.addClass('View')

var titleGame = new Heading(1)
titleGame.setText('Encuentra el Punto Blanco')
view.add(titleGame)

const title = new Heading(2)
title.setText('Guarde sus datos de usuario')
title.onClick(() => alert('Al hacer clic en este título no encontrara el punto'))
view.add(title)

const registerForm = new RegisterForm
registerForm.onSubmit(event => {
    event.preventDefault()

    const name = registerForm.getName()
    const surname = registerForm.getSurname()
    const email = registerForm.getEmail()
    const username = registerForm.getUsername()
    const password = registerForm.getPassword()
    const passwordRepeat = registerForm.getPasswordRepeat()

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat)

        registerForm.clear()

        registerForm.setFeedback('user successfully registered', 'success')

        setTimeout(() => location.href = '../login', 1000)
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please, correct it')
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype them')
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one')
        else
            registerForm.setFeedback('sorry, there was an error, please try again later')
    }
})

const loginLink = new Link
loginLink.setText('Login')
loginLink.onClick(event => {
    event.preventDefault()

    setTimeout(() => location.href = '../login', 100)
})

view.add(registerForm)
view.add(loginLink)