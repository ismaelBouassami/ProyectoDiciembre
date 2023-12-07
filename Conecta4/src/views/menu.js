export { menu };

const menu = () => `<nav class="navbar navbar-expand-lg bg-dark">
<div class="container-fluid">
  <a class="navbar-brand text-light" href="#">Home</a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
     
      <li class="nav-item">
        <a class="nav-link text-light" href="#/allgames">Games</a>
      </li>
      <li class="nav-item">
      <a class="nav-link text-light" href="#/login">Login</a>
    </li>
    <li class="nav-item">
    <a class="nav-link text-light" href="#/register">Register</a>
  </li>
     
  <li class="nav-item dropdown" style="text-align: right;">
  <a class="nav-link text-light dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuario</a>
  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><a class="dropdown-item" href="#/profile">Profile</a></li>
      <li><hr class="dropdown-divider"></li> 
      <li><a class="dropdown-item" href="#/logout">Logout</a></li> 
  </ul> 
</li>
    </ul>
   
</div>
</nav>
`;
