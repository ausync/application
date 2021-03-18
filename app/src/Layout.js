import logo from './logo.svg';

export default function Layout({children}, props) {

    return (
<div className="App">
  <header className="navbar navbar-dark bg-dark">
    <div className="container-fluid">
        <a class="navbar-brand" href="/">
          <img src={logo}  alt="logo" className="App-logo d-inline-block align-top" />
          Ausync
        </a>

         <div className="d-flex">
            <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/mixer">Create an audio</a>
                </li>
                 { /* TODO: profile settings
                <li className="nav-item">
                  <a className="nav-link" href="/mixer">profile</a>
                </li> */ }
            </ul>
         </div>
        { /* TODO: search
         <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button class="btn btn-outline-success" type="submit">Search</button>
         </form> */ }
     </div>
  </header>
   { //<Vote contract={props.contract} account={props.account} />
   }
  <main>{children}</main>

</div>
    );
}