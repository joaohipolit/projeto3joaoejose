// Array de citações mockadas (simulando uma API)
const mockQuotes = [
    { quote: "A única maneira de fazer um excelente trabalho é amar o que você faz.", author: "Steve Jobs" },
    { quote: "O sucesso não é definitivo, o fracasso não é fatal: é a coragem de continuar que conta.", author: "Winston Churchill" },
    { quote: "A vida é o que acontece enquanto você está ocupado fazendo outros planos.", author: "John Lennon" },
    { quote: "O pessimista vê a dificuldade em cada oportunidade; o otimista vê a oportunidade em cada dificuldade.", author: "Winston Churchill" },
    { quote: "Se você pode sonhar, você pode realizar.", author: "Walt Disney" },
    { quote: "A inovação distingue entre um líder e um seguidor.", author: "Steve Jobs" },
    { quote: "Não espere por oportunidades extraordinárias. Agarre as ocasiões comuns e torne-as grandes.", author: "Orison Swett Marden" },
];

// Array de cores em hexadecimal para transições dinâmicas
const colors = [
    '#ef4444', // red
    '#22c55e', // green
    '#8b5cf6', // violet
    '#3b82f6', // blue
    '#ec4899', // pink
    '#14b8a6', // teal
    '#f97316', // orange
    '#06b6d4', // cyan
];

// Variáveis de estado
let currentQuoteIndex = -1;
let currentColor = colors[0];

// Referências aos elementos do DOM
const quoteText = document.getElementById('text');
const quoteAuthor = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const tweetQuoteLink = document.getElementById('tweet-quote');
const root = document.documentElement; // Para aceder e atualizar a variável CSS

/**
 * Atualiza a cor de fundo e dos elementos manipulando a variável CSS --main-color.
 * @param {string} newColor - O novo código hexadecimal da cor.
 */
function updateColor(newColor) {
    currentColor = newColor;
    root.style.setProperty('--main-color', newColor);
}

/**
 * Seleciona uma nova citação e cor aleatória, e atualiza a interface.
 */
function getRandomQuote() {
    // 1. Iniciar fade-out do texto e autor (tornar invisível)
    quoteText.style.opacity = 0;
    quoteAuthor.style.opacity = 0;

    // 2. Após a transição de fade-out (0.5s), mudar o conteúdo e cor
    setTimeout(() => {
        let randomIndex;
        let newColor;

        // Encontrar um novo índice de citação que não seja o atual
        do {
            randomIndex = Math.floor(Math.random() * mockQuotes.length);
        } while (randomIndex === currentQuoteIndex);

        currentQuoteIndex = randomIndex;
        const newQuote = mockQuotes[currentQuoteIndex];

        // Encontrar uma nova cor que não seja a atual
        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (newColor === currentColor);
       
        // Atualizar cor e conteúdo (Requisito 6, 7, 8, 9)
        updateColor(newColor);
        quoteText.innerHTML = `<i class="fa-solid fa-quote-left mr-3"></i>${newQuote.quote}`;
        quoteAuthor.innerText = `- ${newQuote.author}`;

        // Atualizar o link para tweetar (Requisito 10)
        const tweetUrl = `https://twitter.com/intent/tweet?hashtags=quotes,freecodecamp&text="${newQuote.quote}" - ${newQuote.author}`;
        tweetQuoteLink.setAttribute('href', tweetUrl);

        // 3. Iniciar fade-in do texto e autor (tornar visível)
        quoteText.style.opacity = 1;
        quoteAuthor.style.opacity = 1;

    }, 500); // Tempo de espera para o fade-out
}

// Requisito 8 e 9: Adicionar o event listener ao botão
newQuoteButton.addEventListener('click', getRandomQuote);

// Requisito 6 e 7: Carregar a citação inicial ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Definir opacidade inicial para 0 para a animação inicial
    quoteText.style.opacity = 0;
    quoteAuthor.style.opacity = 0;
    getRandomQuote();
});