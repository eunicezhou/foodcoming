const lines = document.getElementById('lines');
const signUpForm = document.querySelector('.signUpForm');
const logInForm = document.querySelector('.signInForm');
const sidebar = document.querySelector('.sidebar');
const signUp = sidebar.querySelector('.signup');
const signup_nav = document.querySelector('.signup');
const logIn = sidebar.querySelector('.login');
const login_nav = document.querySelector('.login');

lines.addEventListener('click', () => {
    sidebar.style.display = 'flex';
    sidebar.querySelector('.shelder').addEventListener('click',()=>{
        sidebar.style.display = 'none';
    })
})

signup_nav.addEventListener('click', (event) => {
    event.stopPropagation();
    showUpForm(signUpForm);
    sidebar.style.display = 'none';
});

signUp.addEventListener('click', (event) => {
    event.stopPropagation();
    showUpForm(signUpForm);
    sidebar.style.display = 'none';
});

login_nav.addEventListener('click',(event)=>{
    event.stopPropagation();
    showUpForm(logInForm);
    sidebar.style.display = 'none';
})

logIn.addEventListener('click',(event)=>{
    event.stopPropagation();
    showUpForm(logInForm);
    sidebar.style.display = 'none';
})

function showUpForm(form){
    form.style.display = 'flex';
    form.querySelector('.shelder').addEventListener('click',()=>{
        form.style.display = 'none';
    })
}