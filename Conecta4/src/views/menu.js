export {menu};

const menu = () => `<nav class="navbar navbar-expand-lg bg-dark">
<div class="container-fluid">
  <a class="navbar-brand text-light" href="#">Home</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      <li class="nav-item">
        <a class="nav-link text-light active" aria-current="page" href="#">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-light" href="#/game">Game</a>
      </li>
      <li class="nav-item">
      <a class="nav-link text-light" href="#/login">Login</a>
    </li>
      <li class="nav-item">
        <a class="nav-link text-light disabled" aria-disabled="true">Disabled</a>
      </li>
    </ul>
    
</div>
</nav>
`;