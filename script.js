
const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')



const localStorageTransactions = JSON.parse(localStorage
 .getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []


    const removeTransaction = ID => {
       transactions = transactions. filter(transaction => 
        transaction.id !== ID)
       upadateLocalStorage()
        init ()
    }

    const addTransactionIntoDom = ({ amount, name, id }) => {
        const operator = amount < 0 ? '-' : '+'
        const CSSClass = amount < 0 ? 'minus' : 'plus'
        const amountWithoutOperator = Math.abs(amount)
        const li = document.createElement('li')

        li.classList.add(CSSClass)
        li.innerHTML = `
        ${name} 
        <span>${operator} R$ ${amountWithoutOperator}</span>
        <button class="delete-btn" onClick="removeTransaction(${id})">x</button>
        `
        transactionsUl.append(li)

    }

    const getExpenses = transactionsAmounts => Math.abs (transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)

    const getIncome = transactionsAmounts => transactionsAmounts
         .filter(value => value > 0)
         .reduce((accumulator, value) => accumulator + value, 0)
         .toFixed(2)

   const getTotal = transactionsAmounts => transactionsAmounts
   .reduce((accumulator, transaction) => accumulator + transaction, 0)
   .toFixed(2)
    

const updateBalanceValues = () => {
const transactionsAmounts =transactions.map(({ amount }) => amount)
const total =  getTotal(transactionsAmounts)
const income = getIncome(transactionsAmounts)
const expense = getExpenses(transactionsAmounts)

balanceDisplay.textContent = `R$ ${total}`
incomeDisplay.textContent = `R$ ${income}`
expenseDisplay.textContent = `R$ ${expense}`
}



    const init = () => {
 transactionsUl.innerHTML = ''
 transactions.forEach(addTransactionIntoDom)
 updateBalanceValues()
    }

    init ()

    const upadateLocalStorage = () => {
        localStorage.setItem('transactions', JSON.stringify(transactions))
    }

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(),
        name: transactionName, 
        amount: Number(transactionAmount)
    })
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value =  ''
}

const handleFormSubmit = event => {
    event.preventDefault()

        const transactionName = inputTransactionName.value.trim()
        const transactionAmount = inputTransactionAmount.value.trim()
        const isSomeInputEmpty = transactionName === ''|| transactionAmount ==='' 

        if (isSomeInputEmpty) {
            alert('por favor, preencha tanto o nome quanto o valor da transação')
            return
        }

addToTransactionsArray(transactionName, transactionAmount)     
init()
upadateLocalStorage()
cleanInputs()
    }
 form.addEventListener('submit',  handleFormSubmit)
 
 /*

const transactionsUl = document.querySelector('#transactions')
//Inserindo a Ul do transactions do html
const incomeDisplay =document.querySelector('#money-plus')
//Inserindo a Ul do incomeDisplay do html
const expenseDisplay =document.querySelector('#money-minus')
const balanceDisplay =document.querySelector('#balance')
//pegando os dados do formulario de entrada
const form = document.querySelector('#form')
//input do texto id 
const inputTransactionName = document.querySelector('#text')
//input do valor id
const inputTransactionAmount = document.querySelector('#amount')


//adicina no Json
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

  //verifica se não for false deixa vazia
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : [] 

const removeTransaction = ID => {
   //  Apaga o da lista 
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

//Vetor de dados 
const addTransactionIntoDOM = transaction => {
   // Verifica se o amount é menor que zero e insere em operator
    const operator= transaction.amount < 0 ? '-' : '+'
    //Verifica se o amount é menor que zero e insere em *CSSClass
    const CSSClass= transaction.amount < 0 ? 'minus' : 'plus'
    //Math.abs'' pega só o valor sem o negativo
    const amountWithoutOperator= Math.abs(transaction.amount)
    //metodo criar novo elemento
    const li = document.createElement('li')

    'classList.add' Insere no Html a clase do CSSClass
    li.classList.add(CSSClass)
    inserindo no Html li
    //e botão na função
    li.innerHTML =`
    ${transaction.name} 
    <span> ${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
        x
    </button>
    `

    transactionsUl.append(li)
   // mostra ultima filha  elemento na ul 
}

//função que insere somente os valores de amount em um vetor como valor
const updateBalanceValues = () => {
    //na função faz um array só com dados de amount em numero
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount)
    //percorre o  transactionsAmonts(só os valores) aramazena tudo no accumulator
    const total = transactionsAmounts
   // reduz o array
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
     fixa dois valores decimais no final
        .toFixed(2)
   // o item só vai ser adicionado se for verdadeira(numeros maiores que zero
    const income = transactionsAmounts
  //  Filtra o array
        .filter(value => value > 0)
    //reduz o array
        .reduce((accumulator, value) => accumulator + value, 0)
        .toFixed(2)
   // expense uma array filtra só numeros menores que zero 
        const expense = Math.abs( transactionsAmounts
        .filter(value => value < 0)
        .reduce((accumulator, value) => accumulator + value, 0))
        .toFixed(2)
   // inserir no html o contexto
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}
//quando a pagina for carregada vai inserir no Dom
const init = () => {
    limpando pra não duplicar 
    transactionsUl.innerHTML = ''
    loop vai percorrer a função e inserir no Dom quando carregar a pagina
    transactions.forEach(addTransactionIntoDOM)
    Chama a função
    updateBalanceValues()
}



//inicia aqui chamando a função
init()

const updateLocalStorage = () =>{
    localStorage.setItem('transactions', JSON.stringify(transactions))
}
//pega um numero aleatório entre 1000
const generateID = () => Math.round(Math.random() * 1000)



 // evento quando for no submit 
form.addEventListener('submit', event => {
    //verificar se valores não estão vazios
    event.preventDefault()

   // inserindo o valor input sem espaços em branco no inicio e fim
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
   // verifica se não está sem dados nenhum dos dois inputs e só vai continua
   // se passar daqui
    if (transactionName === ''|| transactionAmount === ''){
      alert('Por favor preencha todos os dados')  
      return
    }

    //array com valores inseridos no html
    const transaction = {
        id: generateID(), 
        name: transactionName,
        amount: Number(transactionAmount)
    }
     console.log(transaction)
    
   // inserindo os valores recebidos na transaction 
    transactions.push(transaction)
    invocou init
    init()

    updateLocalStorage()

   // limpando as variaveis
    inputTransactionName.value= ''
    inputTransactionAmount.value = ''

    console.log(transaction)
})
*/