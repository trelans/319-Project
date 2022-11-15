import "./LoginPage.css";

function LoginPage() {
  return (
    <div class="container">
      <div>
        <form>
          <div className="center">
            <h1>
              Welcome to <br /> Erasmus App!
            </h1>
          </div>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <div className="center">
            <button>LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
