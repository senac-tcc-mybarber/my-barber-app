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
            <code>protractor ./e2e/src/selenium/conf.js</code>
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
    <li>
        <p>
            Após a execução do protractor, para gerar o relatório, deverá instalar o allure-commandline
        </p>
        <p>
            <code>npm install -g allure-commandline</code>
        </p>
    </li>
    <li>
        <p>
            Após instalar o commandline do allure, execute o comando abaixo para gerar o relatório
        </p>
        <p>
            <code>allure generate --clean</code>
        </p>
    </li>
    <li>
        <p>
            Os arquivos do relatório serão gerados.
            Para abrir o relatório, digite o comando para rodar o servidor do allure, onde o relatório será exibido.
        </p>
        <p>
            <code>allure serve</code>
        </p>
    </li>
    <li>
        <p>
            O navegador será aberto e mostrará o relatório parecido com o que está na imagem.
        </p>
        <p>
            <img src="https://i.ibb.co/ZY3YQqF/image.png" alt="image" border="0">
        </p>
    </li>
</ul>

Fonte Protractor: https://medium.com/cwi-software/automa%C3%A7%C3%A3o-de-testes-com-protractor-e-selenium-webdriver-para-aplica%C3%A7%C3%B5es-web-8d80fe440b20

Fonte Relatório Protractor: https://medium.com/qaninja/apresentando-relat%C3%B3rios-de-testes-automatizados-com-protractor-nodejs-257246a69b16

