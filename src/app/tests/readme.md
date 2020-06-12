Para rodar o Protractor, realizar os seguintes passos:

<ul>
    <li>
        <p>
            Instalar o protractor
        </p>
        <p>
            <code>npm install -g protractor</code>
        </p>
    </li>
    <li>
        <p>
            Verificar se o protractor foi instalado com sucesso
        </p>
        <p>
            <code>protractor --version</code>
        </p>
    </li>
    <li>
        <p>
            Fazer download dos binários do WebDriver:
        </p>
        <p>
            <code>webdriver-manager update</code>
        </p>
    </li>
    <li>
        <p>
            Para executar o WebDriver, crie um novo terminal e rode o comando abaixo
        </p>
        <p>
            <code>webdriver-manager start</code>
        </p>
    </li>
    <li>
        <p>
            Se aparecer mensagem conforme abaixo, significa que funcionou.
        </p>
        <p>
            <img src="https://miro.medium.com/max/2000/1*7U1NPXv5dGYyldIjMNNQXA.png" />
        </p>
    </li>
    <li>
        <p>
            Com o WebDriver rodando, rode o comando abaixo em uma nova janela.
        </p>
        <p>
            <code>protractor ./src/app/tests/conf.js</code>
        </p>
    </li>
    <li>
        <p>
            Após execução, se a tela for como essa, significa que deu certo.
        </p>
        <p>
            <img src="https://i.ibb.co/ZMmdD6J/protractor-success.png" alt="protractor-success" border="0">
        </p>
    </li>
</ul>

Fonte: https://medium.com/cwi-software/automa%C3%A7%C3%A3o-de-testes-com-protractor-e-selenium-webdriver-para-aplica%C3%A7%C3%B5es-web-8d80fe440b20

