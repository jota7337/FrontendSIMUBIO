const Inicio= () =>{


    return(

        <div>
          <div id="wrapper">


<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

 
  <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/login">
    <div class="sidebar-brand-icon rotate-n-15">
      <i class="fas fa-laugh-wink"></i>
    </div>
    <div class="sidebar-brand-text mx-3">Inicio</div>
  </a>



  <hr class="sidebar-divider"/>

 
  <li class="nav-item">
    <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
       aria-expanded="true" aria-controls="collapseTwo">
      <i class="fas fa-fw fa-cog"></i>
      <span>Facturación</span>
    </a>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
      <div class="bg-white py-2 collapse-inner rounded">
        <h6 class="collapse-header">Seleccione una opción</h6>
        <a class="collapse-item" href="/RegistroFactura">Registrar Factura</a>
        <a class="collapse-item" href="/MostrarFactura">Mostrar Facturas</a>
      </div>
    </div>
  </li>



  <div class="text-center d-none d-md-inline">
    <button class="rounded-circle border-0" id="sidebarToggle"></button>
  </div>

</ul>

<div id="content-wrapper" class="d-flex flex-column">


  <div id="content">


    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

  
      <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
        <i class="fa fa-bars"></i>
      </button>


   
      <ul class="navbar-nav ml-auto">

      
        <li class="nav-item dropdown no-arrow d-sm-none">
          <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-search fa-fw"></i>
          </a>
        
          <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
               aria-labelledby="searchDropdown">
            <form class="form-inline mr-auto w-100 navbar-search">
              <div class="input-group">
                <input type="text" class="form-control bg-light border-0 small"
                       placeholder="Search for..." aria-label="Search"
                       aria-describedby="basic-addon2"/>
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fas fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>



        <div class="topbar-divider d-none d-sm-block"></div>

      
        <li class="nav-item dropdown no-arrow">
          <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
             data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="mr-2 d-none d-lg-inline text-gray-600 small"></span>
            <img class="img-profile rounded-circle"
                 src="img/undraw_profile.svg"/>
          </a>
     


            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
              <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Logout
            </a>
        
        </li>

      </ul>
    </nav>
 

    <div class="container-fluid">

   
      <h1 class="h3 mb-2 text-gray-800">Especies Registradas</h1>


    
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Registros</h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered" id="facturas" width="100%" cellspacing="0">
              <thead>
              <tr>
                <th>Id</th>
                <th>Especie</th>
                <th>Fecha de registro</th>
                <th>Nombre cientifico</th>
                <th>Ideintifacdo por</th>
                <th>Descripcion</th>
                <th>Ubicacion</th>
                <th>Eventp</th>
              </tr>
              </thead>
              <tbody>

              </tbody>
            </table>

          </div>
        </div>
      </div>

    </div>
   

  </div>

  <footer class="sticky-footer bg-white">
    <div class="container my-auto">
      <div class="copyright text-center my-auto">
        <span>Copyright &copy; Your </span>
      </div>
    </div>
  </footer>


</div>


</div>

<a class="scroll-to-top rounded" href="#page-top">
<i class="fas fa-angle-up"></i>
</a>


<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
   aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
      <button class="close" type="button" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
    <div class="modal-footer">
      <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
      <a class="btn btn-primary" href="/login">Logout</a>
    </div>
  </div>
</div>
</div>

        </div>
    
)}

export default Inicio