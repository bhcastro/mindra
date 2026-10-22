const body = document.querySelector('body');
const cabecalho = document.createElement('header');
body.prepend(cabecalho);
cabecalho.innerHTML = `
    <div>
        <h1>Olá, usuário!</h1>
    </div>
    <div>
        <nav>
            <a href="dashboard.html" id="btn-home" class="btn-nav-header">Home</a>
            <a href="interanalista.html" id="btn-interanalista" class="btn-nav-header">Interanalista</a>
            <a href="controles.html" id="btn-qualidade" class="btn-nav-header">Qualidade</a>
            <button type="button" id="btn-sair" class="btn-nav-header">Sair</button>
        </nav>
    </div>`